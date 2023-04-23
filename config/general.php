<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\config\GeneralConfig;
use craft\helpers\App;

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';

return [
    // Aliases
    'aliases' => array(
        'basePath' => $_SERVER['DOCUMENT_ROOT'],
        'baseUrl'  => "//" . $_SERVER['HTTP_HOST'],
        '@web' => App::env('PRIMARY_SITE_URL'),
        '@webroot' => dirname(__DIR__) . '/web',
        '@assetUrl' => '@web/assets',
        '@assetPath' => '@webroot/assets',                    
        '@imgUrl' => '@web/assets/img',
        '@imgPath' => '@webroot/assets/img', 
        'staticAssetsVersion' => time(),
    
    ),

    // Craft config settings from .env variables
    'allowUpdates' => (bool)App::env('ALLOW_UPDATES'),
    'allowAdminChanges' => (bool)App::env('ALLOW_ADMIN_CHANGES'),
    'backupOnUpdate' => (bool)App::env('BACKUP_ON_UPDATE'),
    'devMode' => (bool)App::env('DEV_MODE'),
    'enableTemplateCaching' => (bool)App::env('ENABLE_TEMPLATE_CACHING'),
    'isSystemLive' => (bool)App::env('IS_SYSTEM_LIVE'),
    'runQueueAutomatically' => (bool)App::env('RUN_QUEUE_AUTOMATICALLY'),
    'securityKey' => App::env('SECURITY_KEY'),
    'testToEmailAddress' => (bool)App::env('TEST_TO_EMAIL', false),
    'useEmailAsUsername' => (bool)App::env('EMAIL_TO_USERNAME', true),
    'setPasswordPath' => App::env('SET_PASSWORD_PATH'),
    'setPasswordRequestPath' => App::env('SET_PASSWORD_REQUEST_PATH'),
    'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',

    // Craft config settings from constants
    'sendPoweredByHeader' => false,	// why would anybody do this.. talk about increasing security risks
    'defaultWeekStartDay' => 1,
    'cacheDuration' => false,
    'defaultSearchTermOptions' => [
        'subLeft' => true,
        'subRight' => true,
    ],
    'defaultTokenDuration' => 'P2W',
    'enableCsrfProtection' => true,
    'errorTemplatePrefix' => 'errors/',
    'generateTransformsBeforePageLoad' => true,
    'maxCachedCloudImageSize' => 3000,
    'maxUploadFileSize' => '100M',
    'omitScriptNameInUrls' => true,
    'useEmailAsUsername' => true,
    'usePathInfo' => true,    
    'disallowRobots' => !$isProd,

    // craft busting... 
    //'environmentVariables' => array(
    //    'staticAssetsVersion' => time(),
    //),
];


/** craft defaults using fluent syntax
 * 
 * return GeneralConfig::create()
 *     // Set the default week start day for date pickers (0 = Sunday, 1 = Monday, etc.)
 *     ->defaultWeekStartDay(1)
 *     // Prevent generated URLs from including "index.php"
 *     ->omitScriptNameInUrls()
 *     // Enable Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
 *     ->devMode(App::env('DEV_MODE') ?? false)
 *     // Preload Single entries as Twig variables
 *     ->preloadSingles()
 *     // Allow administrative changes
 *     ->allowAdminChanges(App::env('ALLOW_ADMIN_CHANGES') ?? false)
 *     // Disallow robots
 *     ->disallowRobots(App::env('DISALLOW_ROBOTS') ?? false)
 * ;
**/
