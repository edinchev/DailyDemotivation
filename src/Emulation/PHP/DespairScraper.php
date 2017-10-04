<?php

namespace Emulation\PHP;

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;

require_once('../../../vendor/autoload.php');

class DespairScraper
{
    const SITE_URL = "https://despair.com/collections/demotivators";

    private $seleniumHost = 'http://localhost:4444/wd/hub';

    /** @var  RemoteWebDriver $driver */
    private $driver;

    private $titles = [];
    private $descriptions = [];
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
        for ($pageNum = 1; $pageNum <= $this->numPages; $pageNum++) {
            $queryString = "?page={$pageNum}";
            $fullUrl = DespairScraper::SITE_URL . $queryString;
            $this->printMessage("Getting URL: {$fullUrl}");
            $this->driver->get($fullUrl);
            $this->driver->wait(10)->until();
            $titles = $this->driver->findElement(WebDriverBy::className('.title'));
            var_dump($titles);
        }
    }

    private function printMessage(string $message)
    {
        echo("{$message}\n");
    }
}

new DespairScraper();