<?php

namespace Emulation;

use Exception;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;

require_once('../../vendor/autoload.php');

class DespairScraper
{
    private $debug = false;

    const SITE_URL = "https://despair.com/collections/demotivators";
    const ELEMENT_WAIT_TIMEOUT = 5; // seconds
    const ELEMENT_DESCRIPTION = '.info p';
    const ELEMENT_TITLE = '.info .title';

    private $seleniumHost = 'http://localhost:4444/wd/hub';

    /** @var  RemoteWebDriver $driver */
    private $driver;

    private $titles = [];
    private $descriptions = [];
    private $titlesAndDescriptions = [];

    private $numPages = 2;

    public function __construct()
    {
        $capabilities = DesiredCapabilities::chrome();
        $this->driver = RemoteWebDriver::create($this->seleniumHost, $capabilities, 5000);
        $this->scrapeSite();
        $this->driver->quit();
    }

    /**
     *
     */
    private function scrapeSite()
    {
        // Loop through all pages and push titles and descriptions to properties.
        for ($pageNum = 1; $pageNum <= $this->numPages; $pageNum++) {
            $queryString = "?page={$pageNum}";
            $fullUrl = self::SITE_URL . $queryString;

            $this->printMessage("Getting URL: {$fullUrl}");
            $this->driver->get($fullUrl);

            $this->printMessage("Getting page titles.");
            $this->getPageTitles();

            $this->printMessage("Getting page descriptions.");
            $this->getPageDescriptions();
        }

        $length = $this->validateTitleAndDescriptionLengths();
        $this->combineTitlesAndDescriptions($length);

        print_r($this->titlesAndDescriptions);
        $this->printMessage("['" . implode("','", $this->titlesAndDescriptions) . "']");
    }

    private function validateTitleAndDescriptionLengths()
    {
        $this->printMessage('Validating Title and Description Lengths.');

        $titlesLength = count($this->titles) - 1;
        $descriptionsLength = count($this->descriptions) - 1;

        if ($titlesLength != -1 && ($titlesLength != $descriptionsLength)) {
            throw new Exception("Titles length of: {$titlesLength} does not match Descriptions length of: {$descriptionsLength}");
        }

        return $titlesLength;
    }

    /**
     * @param $length
     */
    private function combineTitlesAndDescriptions($length)
    {
        $this->printMessage("Combining Titles and Descriptions");

        for ($i = 0; $i <= $length; $i++) {
            $this->titlesAndDescriptions[] = "{$this->titles[$i]}. {$this->descriptions[$i]}";
        }
    }

    /**
     * @return array
     */
    private function getPageTitles()
    {
        $this->driver->wait(self::ELEMENT_WAIT_TIMEOUT)
            ->until(WebDriverExpectedCondition::presenceOfAllElementsLocatedBy(
                WebDriverBy::cssSelector(self::ELEMENT_TITLE)
            ));
        $elements = $this->driver->findElements(WebDriverBy::cssSelector(self::ELEMENT_TITLE));

        foreach ($elements as $element) {
            $this->titles[] = $element->getText();
        }

        if ($this->debug) {
            var_dump($this->titles);
        }
    }

    /**
     *
     */
    private function getPageDescriptions()
    {
        $this->driver->wait(self::ELEMENT_WAIT_TIMEOUT)
            ->until(WebDriverExpectedCondition::presenceOfAllElementsLocatedBy(
                WebDriverBy::cssSelector(self::ELEMENT_DESCRIPTION)
            ));

        $elements = $this->driver->findElements(WebDriverBy::cssSelector(self::ELEMENT_DESCRIPTION));

        foreach ($elements as $element) {
            $this->descriptions[] = addslashes($element->getText());
        }

        if ($this->debug) {
            var_dump($this->descriptions);
        }
    }

    private function printMessage(string $message)
    {
        echo("{$message}\n");
    }
}

new DespairScraper();