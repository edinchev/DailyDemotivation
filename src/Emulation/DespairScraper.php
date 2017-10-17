<?php

namespace Emulation;

use Exception;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;

require_once('../../vendor/autoload.php');

/**
 * Class DespairScraper
 * @package Emulation
 */
class DespairScraper
{
    // Dump more details in terminal while scraping.
    private $debug = false;

    // Docker selenium server.
    private $seleniumHost = 'http://localhost:4444/wd/hub';

    /** @var  RemoteWebDriver $driver */
    private $driver;

    // Site details.
    const SITE_URL = "https://despair.com/collections/demotivators";
    const SELECTOR_QUOTE_DESCRIPTION = '.info p';
    const SELECTOR_QUOTE_TITLE = '.info .title';

    // Arrays to hold scraped and parsed data.
    private $titles = [];
    private $descriptions = [];
    private $titlesAndDescriptions = [];

    // Number of pages to loop through.
    // Can add logic to make this dynamic but wanted a quick solution.
    private $numPages = 2;

    public function __construct()
    {
        $capabilities = DesiredCapabilities::chrome();
        $this->driver = RemoteWebDriver::create($this->seleniumHost, $capabilities, 5000);
        $this->scrapeSite();
        $this->parseData();
        $this->driver->quit();
    }

    /**
     * Loop through each page on site and scrape titles and descriptions.
     */
    private function scrapeSite()
    {
        for ($pageNum = 1; $pageNum <= $this->numPages; $pageNum++) {
            $queryString = "?page={$pageNum}";
            $fullUrl = self::SITE_URL . $queryString;

            $this->printMessage("Getting URL: {$fullUrl}");
            $this->driver->get($fullUrl);

            $this->printMessage("Getting page titles.");
            $this->getQuoteTitles();

            $this->printMessage("Getting page descriptions.");
            $this->getQuoteDescriptions();
        }
    }

    /**
     * Combines the titles and descriptions into one array.
     */
    private function parseData()
    {
        $length = $this->validateTitleAndDescriptionLengths();

        $this->printMessage("Combining Titles and Descriptions");

        for ($i = 0; $i <= $length; $i++) {
            $this->titlesAndDescriptions[] = "{$this->titles[$i]}. {$this->descriptions[$i]}";
        }

        print_r($this->titlesAndDescriptions);
        $this->printMessage("['" . implode("','", $this->titlesAndDescriptions) . "']");
    }

    /**
     * Validate that titles and descriptions array match in length.
     *
     * @return int
     * @throws Exception
     */
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
     * @return array
     */
    private function getQuoteTitles()
    {
        $elements = $this->getElementsByCssSelector(self::SELECTOR_QUOTE_TITLE);

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
    private function getQuoteDescriptions()
    {
        $elements = $this->getElementsByCssSelector(self::SELECTOR_QUOTE_DESCRIPTION);

        foreach ($elements as $element) {
            $this->descriptions[] = addslashes($element->getText());
        }

        if ($this->debug) {
            var_dump($this->descriptions);
        }
    }

    /**
     * Wrap WebDriver Logic to keep code DRY.
     * @param $cssSelector
     * @param int $waitTimeout (seconds)
     * @return \Facebook\WebDriver\Remote\RemoteWebElement[]
     */
    private function getElementsByCssSelector($cssSelector, $waitTimeout = 5)
    {
        $this->driver->wait($waitTimeout)
            ->until(WebDriverExpectedCondition::presenceOfAllElementsLocatedBy(
                WebDriverBy::cssSelector($cssSelector)
            ));

        return $this->driver->findElements(WebDriverBy::cssSelector($cssSelector));
    }


    /**
     * @param $message
     */
    private function printMessage($message)
    {
        echo("{$message}\n");
    }
}

new DespairScraper();