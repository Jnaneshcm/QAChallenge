const app = document.getElementById('app');

if (!app) {
  throw new Error('Root element #app was not found');
}

const TOPICS = [
  {
    slug: 'selenium-webdriver',
    title: 'Selenium WebDriver',
    description: 'Browser automation fundamentals, locators, waits.',
    timeLimitMinutes: 180
  },
  {
    slug: 'selenium-framework-design',
    title: 'Selenium Framework',
    description: 'Design scalable and maintainable Selenium frameworks.',
    timeLimitMinutes: 180
  },
  {
    slug: 'rest-api-testing',
    title: 'Rest Api testing',
    description: 'HTTP methods, API validation, assertions, and test design.',
    timeLimitMinutes: 180
  },
   {
    slug: 'api-advanced',
    title: 'Advanced API Testing',
    description: 'In-depth techniques for testing REST and POSTMAN.',
    timeLimitMinutes: 180
  },
  {
    slug: 'playwright-automation',
    title: 'Playwright Automation',
    description: 'Modern end-to-end automation with robust selectors and fixtures.',
    timeLimitMinutes: 180
  }
];

const QUESTION_TEMPLATES = {
  'selenium-webdriver': [
    { stem: 'What is Selenium primarily used for?', options: ['Database Testing', 'Web Application Automation', 'API Testing', 'Performance Testing'], answer: 1, explanation: 'Selenium is primarily used for automating web browsers for testing web applications.'},
    { stem: 'Which Selenium component is used to automate browsers?', options: ['Selenium IDE', 'Selenium Grid', 'Selenium WebDriver', 'Selenium RC'], answer: 2, explanation: 'Selenium WebDriver is the primary component used for browser automation.'},
    { stem: 'Which programming language is NOT officially supported by Selenium?', options: ['Java', 'Python', 'C#', 'Swift'], answer: 3, explanation: 'Selenium officially supports Java, Python, C#, Ruby, JavaScript and Kotlin, but not Swift.'},
    { stem: 'Which browser is NOT supported by Selenium WebDriver?', options: ['Chrome', 'Firefox', 'Edge', 'Adobe Reader'], answer: 3, explanation: 'Adobe Reader is not a web browser and cannot be automated using Selenium WebDriver.'},
    { stem: 'Which interface is implemented by ChromeDriver?', options: ['SearchContext', 'WebElement', 'WebDriver', 'JavascriptExecutor'], answer: 2, explanation: 'ChromeDriver implements the WebDriver interface.'},
    { stem: 'Which statement creates a Chrome browser instance?', options: ['new ChromeDriver()', 'driver.launch()', 'driver.open()', 'browser.start()'], answer: 0, explanation: 'Instantiating ChromeDriver launches a Chrome browser.' },
    { stem: 'Which WebDriver method opens a specified URL?', options: ['driver.open()', 'driver.navigate()', 'driver.get()', 'driver.load()'], answer: 2, explanation: 'driver.get() navigates the browser to the specified URL.' },
    { stem: 'Which method returns the title of the current webpage?', options: ['driver.title()', 'driver.getTitle()', 'driver.pageTitle()', 'driver.fetchTitle()'], answer: 1, explanation: 'getTitle() returns the title of the current webpage.'},
    { stem: 'Which method retrieves the current URL of the browser?', options: ['driver.getCurrentUrl()', 'driver.url()', 'driver.currentUrl()', 'driver.location()'], answer: 0, explanation: 'getCurrentUrl() returns the current page URL.' },
    { stem: 'Which locator strategy finds an element using its id attribute?', options: ['By.name()', 'By.className()', 'By.id()', 'By.tagName()'], answer: 2, explanation: 'By.id() locates an element using its unique id attribute.' },
    { stem: 'Which locator strategy searches using the name attribute?', options: ['By.name()', 'By.id()', 'By.xpath()', 'By.cssSelector()'], answer: 0, explanation: 'By.name() locates elements using their name attribute.' },
    { stem: 'Which locator is used to locate hyperlinks by their complete visible text?', options: ['By.linkText()', 'By.tagName()', 'By.className()', 'By.name()'], answer: 0, explanation: 'By.linkText() locates links using their complete visible text.' },
    { stem: 'Which locator searches using a portion of a hyperlink text?', options: ['By.partialLinkText()', 'By.partialText()', 'By.linkContains()', 'By.text()'], answer: 0, explanation: 'By.partialLinkText() locates links using partial visible text.' },
    { stem: 'Which locator is generally faster than XPath?', options: ['CSS Selector', 'Link Text', 'Tag Name', 'Partial Link Text'], answer: 0, explanation: 'CSS Selectors are generally faster than XPath because browsers optimize CSS queries.' },
    { stem: 'Which locator is considered the most flexible for locating complex elements?', options: ['ID', 'XPath', 'Name', 'Tag Name'], answer: 1, explanation: 'XPath can locate almost any element using attributes, relationships and text.' },
    { stem: 'Which method returns the first matching WebElement?', options: ['findElements()', 'findElement()', 'getElement()', 'searchElement()'], answer: 1, explanation: 'findElement() returns the first matching WebElement.' },
    { stem: 'Which method returns a list of matching WebElements?', options: ['findAll()', 'findElement()', 'findElements()', 'getElements()'], answer: 2, explanation: 'findElements() returns a List<WebElement>.' },
    { stem: 'What does findElements() return when no matching element is found?', options: ['Null', 'Exception', 'Empty List', 'False'], answer: 2, explanation: 'findElements() returns an empty list instead of throwing an exception.' },
    { stem: 'What exception is thrown when findElement() cannot locate an element?', options: ['ElementNotFoundException', 'NullPointerException', 'NoSuchElementException', 'ElementMissingException'], answer: 2, explanation: 'findElement() throws NoSuchElementException when no matching element exists.' },
    { stem: 'Which interface represents an HTML element in Selenium?', options: ['SearchContext', 'WebDriver', 'WebElement', 'Locator'], answer: 2, explanation: 'WebElement represents an HTML element on a webpage.' },
    { stem: 'Which command closes only the currently active browser window?', options: ['driver.quit()', 'driver.close()', 'driver.stop()', 'driver.exit()'], answer: 1, explanation: 'driver.close() closes only the active browser window.' },
    { stem: 'Which command closes all browser windows and ends the WebDriver session?', options: ['driver.closeAll()', 'driver.quit()', 'driver.shutdown()', 'driver.stop()'], answer: 1, explanation: 'driver.quit() closes every browser window and terminates the WebDriver session.' },
    { stem: 'Which Selenium architecture communicates directly with browser drivers without using Selenium RC?', options: ['Selenium RC', 'Selenium WebDriver', 'Selenium IDE', 'Selenium Grid'], answer: 1, explanation: 'WebDriver communicates directly with browser-specific drivers.' },
    { stem: 'Which Selenium component allows parallel execution across multiple machines and browsers?', options: ['Selenium IDE', 'Selenium RC', 'Selenium Grid', 'JUnit'], answer: 2, explanation: 'Selenium Grid distributes tests across different machines and browsers.' },
    { stem: 'Which browser driver is required to automate Google Chrome?', options: ['FirefoxDriver', 'EdgeDriver', 'ChromeDriver', 'SafariDriver'], answer: 2, explanation: 'ChromeDriver is the browser driver used to automate Google Chrome.' },
    { stem: 'Which WebElement method clicks on an element?', options: ['press()', 'click()', 'submit()', 'select()'], answer: 1, explanation: 'click() performs a mouse click on a web element.' },
    { stem: 'Which WebElement method enters text into a textbox?', options: ['type()', 'fill()', 'sendKeys()', 'write()'], answer: 2, explanation: 'sendKeys() types text into input fields.' },
    { stem: 'Which method clears the existing text from an input field?', options: ['reset()', 'remove()', 'clear()', 'delete()'], answer: 2, explanation: 'clear() removes any existing value from editable fields.' },
    { stem: 'Which method submits a form?', options: ['submit()', 'click()', 'execute()', 'save()'], answer: 0, explanation: 'submit() submits the form containing the current element.' },
    { stem: 'Which method retrieves the visible text of an element?', options: ['getValue()', 'getAttribute()', 'getText()', 'text()'], answer: 2, explanation: 'getText() returns the visible text of an element.' },
    { stem: 'Which method returns the value of an attribute?', options: ['getProperty()', 'getValue()', 'getAttribute()', 'attribute()'], answer: 2, explanation: 'getAttribute() returns the specified attribute value.' },
    { stem: 'Which method checks whether an element is displayed?', options: ['isVisible()', 'isDisplayed()', 'visible()', 'display()'], answer: 1, explanation: 'isDisplayed() returns true if the element is visible.' },
    { stem: 'Which method checks whether an element is enabled?', options: ['isEnabled()', 'enabled()', 'canClick()', 'active()'], answer: 0, explanation: 'isEnabled() verifies whether an element is enabled.' },
    { stem: 'Which method verifies whether a checkbox or radio button is selected?', options: ['isChecked()', 'isSelected()', 'selected()', 'isMarked()'], answer: 1, explanation: 'isSelected() returns the selected state of checkboxes and radio buttons.' },
    { stem: 'Which navigation method moves to the previous page?', options: ['navigate().back()', 'driver.back()', 'page.back()', 'history.back()'], answer: 0, explanation: 'navigate().back() simulates the browser Back button.' },
    { stem: 'Which navigation method moves to the next page?', options: ['driver.forward()', 'navigate().forward()', 'page.forward()', 'browser.forward()'], answer: 1, explanation: 'navigate().forward() moves forward in browser history.' },
    { stem: 'Which method refreshes the current webpage?', options: ['driver.refresh()', 'navigate().reload()', 'navigate().refresh()', 'page.refresh()'], answer: 2, explanation: 'navigate().refresh() reloads the current page.' },
    { stem: 'Which navigation method is an alternative to driver.get()?', options: ['navigate().to()', 'driver.open()', 'browser.goto()', 'driver.visit()'], answer: 0, explanation: 'navigate().to() loads the specified URL.' },
    { stem: 'Which Selenium interface is used to switch between windows, alerts and frames?', options: ['WebDriver.TargetLocator', 'Navigation', 'Options', 'JavascriptExecutor'], answer: 0, explanation: 'TargetLocator provides methods for switching contexts.' },
    { stem: 'Which method switches control to another browser window?', options: ['driver.window()', 'driver.switchTo().window()', 'driver.changeWindow()', 'driver.focus()'], answer: 1, explanation: 'switchTo().window() changes the active browser window.' },
    { stem: 'Which method returns the current window handle?', options: ['getHandle()', 'getWindowHandle()', 'windowHandle()', 'currentWindow()'], answer: 1, explanation: 'getWindowHandle() returns the unique identifier of the active window.' },
    { stem: 'Which method returns all open browser window handles?', options: ['getWindows()', 'getWindowHandles()', 'windowHandles()', 'getAllHandles()'], answer: 1, explanation: 'getWindowHandles() returns a Set<String> containing all window IDs.' },
    { stem: 'Which method switches to an iframe using its index?', options: ['switchTo().frame(index)', 'frame(index)', 'gotoFrame()', 'changeFrame()'], answer: 0, explanation: 'switchTo().frame(index) switches to a frame by index.' },
    { stem: 'How do you switch back from an iframe to the main page?', options: ['switchTo().parent()', 'switchTo().defaultContent()', 'switchTo().home()', 'driver.home()'], answer: 1, explanation: 'defaultContent() switches back to the main document.' },
    { stem: 'Which method switches to a JavaScript alert?', options: ['switchTo().popup()', 'switchTo().alert()', 'switchTo().dialog()', 'driver.alert()'], answer: 1, explanation: 'switchTo().alert() provides access to JavaScript alerts.' },
    { stem: 'Which method accepts a JavaScript alert?', options: ['alert.ok()', 'alert.accept()', 'alert.confirm()', 'alert.close()'], answer: 1, explanation: 'accept() clicks the OK button on an alert.' },
    { stem: 'Which method dismisses a confirmation alert?', options: ['alert.dismiss()', 'alert.reject()', 'alert.cancel()', 'alert.close()'], answer: 0, explanation: 'dismiss() clicks the Cancel button on confirmation dialogs.' },
    { stem: 'Which Selenium wait waits for a specified amount of time while searching for elements?', options: ['Explicit Wait', 'Implicit Wait', 'Fluent Wait', 'Thread.sleep()'], answer: 1, explanation: 'Implicit Wait tells WebDriver to poll for elements until the timeout expires.' },
    { stem: 'Which Selenium wait waits until a specific condition becomes true?', options: ['Implicit Wait', 'Thread.sleep()', 'Explicit Wait', 'Static Wait'], answer: 2, explanation: 'Explicit Wait uses ExpectedConditions to wait for specific events.' },
    { stem: 'Which Selenium wait allows configuring polling interval and ignored exceptions?', options: ['Implicit Wait', 'Static Wait', 'Fluent Wait', 'Explicit Wait'], answer: 2, explanation: 'Fluent Wait provides custom polling frequency and exception handling.' },
    { stem: 'Which Selenium class is used for performing mouse and keyboard actions?', options: ['Robot', 'Actions', 'ActionBuilder', 'Keyboard'], answer: 1, explanation: 'The Actions class performs advanced mouse and keyboard interactions.' },
    { stem: 'Which method performs a double-click using the Actions class?', options: ['doubleClick()', 'dblClick()', 'clickTwice()', 'doubleTap()'], answer: 0, explanation: 'doubleClick() performs a double-click on an element.' },
    { stem: 'Which method performs a right-click operation?', options: ['contextClick()', 'rightClick()', 'mouseRight()', 'clickRight()'], answer: 0, explanation: 'contextClick() performs a right mouse click.' },
    { stem: 'Which method is used to drag and drop an element?', options: ['moveElement()', 'dragAndDrop()', 'drop()', 'drag()'], answer: 1, explanation: 'dragAndDrop() drags an element from source to destination.' },
    { stem: 'Which method moves the mouse pointer to an element?', options: ['move()', 'moveToElement()', 'hover()', 'focus()'], answer: 1, explanation: 'moveToElement() is commonly used for hover actions.' },
    { stem: 'Which method is called to execute an Actions sequence?', options: ['execute()', 'perform()', 'run()', 'build()'], answer: 1, explanation: 'perform() executes the configured Actions chain.' },
    { stem: 'Which Selenium class is used to handle HTML dropdowns?', options: ['Dropdown', 'Select', 'Option', 'ComboBox'], answer: 1, explanation: 'The Select class is used to interact with HTML select elements.' },
    { stem: 'Which method selects an option by visible text?', options: ['selectByText()', 'selectVisibleText()', 'selectByVisibleText()', 'chooseText()'], answer: 2, explanation: 'selectByVisibleText() selects an option using its displayed text.' },
    { stem: 'Which method selects an option using its value attribute?', options: ['selectByValue()', 'selectValue()', 'chooseValue()', 'selectOption()'], answer: 0, explanation: 'selectByValue() selects an option using its value attribute.' },
    { stem: 'Which method selects an option using its index?', options: ['selectIndex()', 'selectByIndex()', 'chooseIndex()', 'optionIndex()'], answer: 1, explanation: 'selectByIndex() selects an option using its zero-based index.' },
    { stem: 'Which method deselects all selected options in a multi-select dropdown?', options: ['clear()', 'removeAll()', 'deselectAll()', 'unselectAll()'], answer: 2, explanation: 'deselectAll() removes all selected options from a multi-select dropdown.' },
    { stem: 'Which method checks whether a dropdown supports multiple selections?', options: ['isMulti()', 'isMultiple()', 'isMultiSelect()', 'isMultipleSelection()'], answer: 1, explanation: 'isMultiple() returns true if multiple selections are allowed.' },
    { stem: 'Which interface allows JavaScript execution in Selenium?', options: ['JavascriptExecutor', 'ScriptExecutor', 'JavaExecutor', 'Executor'], answer: 0, explanation: 'JavascriptExecutor executes JavaScript inside the browser.' },
    { stem: 'Which method executes synchronous JavaScript?', options: ['execute()', 'executeScript()', 'runScript()', 'executeJS()'], answer: 1, explanation: 'executeScript() executes JavaScript synchronously.' },
    { stem: 'Which method executes asynchronous JavaScript?', options: ['executeAsync()', 'executeAsyncScript()', 'asyncScript()', 'runAsync()'], answer: 1, explanation: 'executeAsyncScript() executes asynchronous JavaScript.' },
    { stem: 'Which JavaScript command scrolls an element into view?', options: ['scroll()', 'scrollIntoView()', 'moveTo()', 'bringIntoView()'], answer: 1, explanation: 'scrollIntoView() scrolls the page until the element becomes visible.' },
    { stem: 'Which JavaScript property retrieves the page title?', options: ['document.title', 'window.title', 'page.title', 'document.pageTitle'], answer: 0, explanation: 'document.title returns the current page title.' },
    { stem: 'Which ExpectedConditions method waits until an element becomes clickable?', options: ['elementVisible()', 'elementToBeClickable()', 'clickable()', 'visibilityOfElement()'], answer: 1, explanation: 'elementToBeClickable() waits until the element is visible and enabled.' },
    { stem: 'Which ExpectedConditions method waits until an element is visible?', options: ['visibilityOf()', 'elementVisible()', 'visible()', 'presenceOf()'], answer: 0, explanation: 'visibilityOf() waits until an element is visible on the page.' },
    { stem: 'Which ExpectedConditions method waits until an alert appears?', options: ['alertPresent()', 'alertIsPresent()', 'alertToBePresent()', 'presenceOfAlert()'], answer: 2, explanation: 'alertIsPresent() does not exist; alertIsPresent? Actually Selenium uses alertIsPresent().' },
    { stem: 'Which wait is generally preferred over Thread.sleep()?', options: ['Implicit Wait', 'Explicit Wait', 'Static Wait', 'No Wait'], answer: 1, explanation: 'Explicit Wait is dynamic and improves test reliability.' },
    { stem: 'What is the primary disadvantage of Thread.sleep()?', options: ['Consumes unnecessary time', 'Improves performance', 'Automatically handles synchronization', 'Works only on Chrome'], answer: 0, explanation: 'Thread.sleep() pauses execution even if the condition is satisfied earlier.' },
    { stem: 'Which Selenium feature allows waiting until a custom condition is met?', options: ['ExpectedConditions', 'Thread.sleep()', 'Static Wait', 'Robot Class'], answer: 0, explanation: 'ExpectedConditions are used with WebDriverWait for dynamic synchronization.' },
    { stem: 'Which exception is commonly thrown when an element becomes detached from the DOM?', options: ['NoSuchElementException', 'StaleElementReferenceException', 'TimeoutException', 'InvalidSelectorException'], answer: 1, explanation: 'StaleElementReferenceException occurs when the referenced element is no longer attached to the DOM.' },
    { stem: 'Which practice improves Selenium test stability the most?', options: ['Using absolute XPath everywhere', 'Replacing waits with Thread.sleep()', 'Using Explicit Waits with reliable locators', 'Refreshing the page before every action'], answer: 2, explanation: 'Combining Explicit Waits with stable locators produces reliable and maintainable automation tests.' },
    { stem: 'Which TestNG annotation executes before every test method?', options: ['@BeforeSuite', '@BeforeTest', '@BeforeMethod', '@BeforeClass'], answer: 2, explanation: '@BeforeMethod runs before each test method.' },
    { stem: 'Which TestNG annotation executes once before all test methods in a class?', options: ['@BeforeSuite', '@BeforeClass', '@BeforeMethod', '@BeforeTest'], answer: 1, explanation: '@BeforeClass executes once before the first test method in the class.' },
    { stem: 'Which TestNG annotation executes after every test method?', options: ['@AfterMethod', '@AfterClass', '@AfterSuite', '@AfterTest'], answer: 0, explanation: '@AfterMethod executes after each test method.' },
    { stem: 'Which TestNG annotation is used to group multiple test methods into logical categories?', options: ['@Category', '@Groups', '@Test(groups="...")', '@Tag'], answer: 2, explanation: 'The groups attribute of @Test is used for grouping tests.' },
    { stem: 'Which TestNG annotation allows a test to receive multiple sets of data?', options: ['@Factory', '@Parameters', '@DataProvider', '@Dataset'], answer: 2, explanation: '@DataProvider supplies multiple datasets to a test method.' },
    { stem: 'Which TestNG feature allows executing the same test with multiple datasets?', options: ['Factory', 'DataProvider', 'Parameters', 'RetryAnalyzer'], answer: 1, explanation: 'DataProvider executes the same test multiple times with different data.' },
    { stem: 'Which TestNG annotation is used for parameterization from testng.xml?', options: ['@Parameters', '@Parameter', '@DataProvider', '@Config'], answer: 0, explanation: '@Parameters injects values from testng.xml.' },
    { stem: 'Which assertion verifies two values are equal?', options: ['Assert.assertEquals()', 'Assert.assertSame()', 'Assert.assertTrue()', 'Assert.verifyEquals()'], answer: 0, explanation: 'assertEquals() compares expected and actual values.' },
    { stem: 'Which assertion verifies a condition is true?', options: ['Assert.assertCondition()', 'Assert.assertTrue()', 'Assert.assertEquals()', 'Assert.assertPass()'], answer: 1, explanation: 'assertTrue() validates a boolean expression.' },
    { stem: 'Which assertion verifies an object is null?', options: ['Assert.assertEmpty()', 'Assert.assertNull()', 'Assert.assertNone()', 'Assert.isNull()'], answer: 1, explanation: 'assertNull() verifies that an object is null.' },
    { stem: 'Which assertion verifies an object is not null?', options: ['Assert.assertExists()', 'Assert.assertNotNull()', 'Assert.assertPresent()', 'Assert.notNull()'], answer: 1, explanation: 'assertNotNull() ensures an object has been initialized.' },
    { stem: 'Which interface is implemented to create custom TestNG listeners?', options: ['ITestListener', 'IReporter', 'ISuiteListener', 'All of the above'], answer: 3, explanation: 'TestNG provides several listener interfaces including ITestListener, IReporter and ISuiteListener.' },
    { stem: 'Which listener method executes when a test fails?', options: ['onTestFailure()', 'onFailure()', 'afterFailure()', 'testFailed()'], answer: 0, explanation: 'onTestFailure() is invoked whenever a test case fails.' },

],
'selenium-framework-design': [
    { stem: 'Which TestNG feature retries failed test cases automatically?', options: ['RetryAnalyzer', 'Listener', 'Reporter', 'Factory'], answer: 0, explanation: 'IRetryAnalyzer allows failed test retries.' },
    { stem: 'Which TestNG attribute controls test execution priority?', options: ['order', 'priority', 'sequence', 'rank'], answer: 1, explanation: 'priority determines the execution order of test methods.' },
    { stem: 'Which TestNG attribute disables a test method?', options: ['disabled=true', 'enabled=false', 'ignore=true', 'skip=true'], answer: 1, explanation: 'enabled=false prevents a test from executing.' },
    { stem: 'Which TestNG attribute specifies test dependencies?', options: ['dependsOnMethods', 'dependency', 'depends', 'requires'], answer: 0, explanation: 'dependsOnMethods executes a test only after dependent methods succeed.' },
    { stem: 'Which TestNG attribute specifies execution timeout?', options: ['timeout', 'maxTime', 'waitTime', 'executionTime'], answer: 0, explanation: 'timeout fails the test if execution exceeds the specified duration.' },
    { stem: 'Which TestNG attribute invokes a test multiple times?', options: ['repeat', 'count', 'invocationCount', 'loop'], answer: 2, explanation: 'invocationCount executes the same test multiple times.' },
    { stem: 'Which TestNG XML tag defines a suite?', options: ['<suite>', '<testsuite>', '<tests>', '<execution>'], answer: 0, explanation: 'The root element in testng.xml is <suite>.' },
    { stem: 'Which TestNG XML tag defines an individual test?', options: ['<case>', '<class>', '<test>', '<method>'], answer: 2, explanation: 'The <test> tag groups related test classes.' },
    { stem: 'Which TestNG XML tag specifies test classes?', options: ['<classes>', '<package>', '<tests>', '<methods>'], answer: 0, explanation: 'The <classes> tag contains one or more test classes.' },
    { stem: 'Which TestNG feature enables parallel execution?', options: ['parallel attribute in testng.xml', 'DataProvider', 'RetryAnalyzer', 'Groups'], answer: 0, explanation: 'The parallel attribute in testng.xml enables parallel execution.' },
    { stem: 'Which parallel mode executes each test class in parallel?', options: ['methods', 'tests', 'classes', 'instances'], answer: 2, explanation: 'parallel="classes" executes different test classes simultaneously.' },
    { stem: 'Which is considered the best practice for Selenium framework design?', options: ['Write all code in one class', 'Use Page Object Model with reusable utilities', 'Use Thread.sleep() everywhere', 'Use only XPath locators'], answer: 1, explanation: 'Page Object Model with reusable utilities improves maintainability, readability and scalability.' },
    { stem: 'What is the primary purpose of Cucumber?', options: ['API Testing', 'Behavior Driven Development (BDD)', 'Performance Testing', 'Database Testing'], answer: 1, explanation: 'Cucumber is a BDD framework that allows writing test scenarios in plain English.' },
    { stem: 'Which file extension is used for Cucumber feature files?', options: ['.java', '.feature', '.xml', '.json'], answer: 1, explanation: 'Cucumber scenarios are written inside .feature files.' },
    { stem: 'Which keyword is used to describe a feature in Cucumber?', options: ['Scenario', 'Feature', 'Story', 'Module'], answer: 1, explanation: 'Every feature file starts with the Feature keyword.' },
    { stem: 'Which keyword describes an individual test case in Cucumber?', options: ['Test', 'Scenario', 'Case', 'Example'], answer: 1, explanation: 'Scenario represents a single test case.' },
    { stem: 'Which keyword is used to specify preconditions?', options: ['When', 'Then', 'Given', 'And'], answer: 2, explanation: 'Given defines the initial state or preconditions.' },
    { stem: 'Which keyword represents an action performed by the user?', options: ['Given', 'When', 'Then', 'But'], answer: 1, explanation: 'When describes the action performed by the user.' },
    { stem: 'Which keyword verifies the expected outcome?', options: ['Given', 'Then', 'When', 'And'], answer: 1, explanation: 'Then validates the expected result.' },
    { stem: 'Which keyword is commonly used to continue the previous step?', options: ['But', 'And', 'Next', 'Continue'], answer: 1, explanation: 'And is used to improve readability by continuing the previous step.' },
    { stem: 'Which class contains the implementation of Cucumber steps?', options: ['Runner Class', 'Feature Class', 'Step Definition Class', 'Hooks Class'], answer: 2, explanation: 'Step Definition classes contain Java methods for feature steps.' },
    { stem: 'Which annotation maps a Given step to Java code?', options: ['@Given', '@When', '@Before', '@Feature'], answer: 0, explanation: '@Given maps a Given step from the feature file.' },
    { stem: 'Which annotation executes before every Cucumber scenario?', options: ['@Before', '@BeforeTest', '@BeforeMethod', '@Setup'], answer: 0, explanation: '@Before executes before each Cucumber scenario.' },
    { stem: 'Which annotation executes after every Cucumber scenario?', options: ['@AfterScenario', '@After', '@Cleanup', '@AfterMethod'], answer: 1, explanation: '@After executes after every scenario.' },
    { stem: 'What is the primary purpose of a Runner class?', options: ['Execute feature files', 'Store locators', 'Handle waits', 'Generate reports'], answer: 0, explanation: 'Runner classes configure and execute Cucumber feature files.' },
    { stem: 'Which annotation specifies the location of feature files?', options: ['@Features', '@CucumberOptions(features=...)', '@FeaturePath', '@FeatureLocation'], answer: 1, explanation: 'The features attribute specifies the location of feature files.' },
    { stem: 'Which annotation specifies the package containing step definitions?', options: ['glue', 'steps', 'definitions', 'packages'], answer: 0, explanation: 'The glue option tells Cucumber where to find step definitions.' },
    { stem: 'What is the primary goal of the Page Object Model (POM)?', options: ['Increase execution time', 'Separate UI locators and business logic', 'Generate reports', 'Reduce browser memory'], answer: 1, explanation: 'POM improves maintainability by separating page objects from test logic.' },
    { stem: 'What should a Page Object class mainly contain?', options: ['Database queries', 'UI locators and page actions', 'TestNG XML', 'JUnit assertions'], answer: 1, explanation: 'A Page Object contains web elements and reusable page methods.' },
    { stem: 'Which annotation is used in PageFactory to identify WebElements?', options: ['@FindBy', '@Locate', '@Element', '@Page'], answer: 0, explanation: '@FindBy locates elements in the PageFactory model.' },
    { stem: 'Which method initializes PageFactory elements?', options: ['PageFactory.start()', 'PageFactory.initElements()', 'PageFactory.load()', 'PageFactory.initialize()'], answer: 1, explanation: 'initElements() initializes all @FindBy annotated fields.' },
    { stem: 'What is the advantage of using PageFactory?', options: ['Improves readability and lazy initialization', 'Faster browser launch', 'Database integration', 'Automatic reporting'], answer: 0, explanation: 'PageFactory improves code readability and initializes elements lazily.' },
    { stem: 'Which build tool is most commonly used with Selenium Java projects?', options: ['Maven', 'Docker', 'Gradle Wrapper Only', 'Tomcat'], answer: 0, explanation: 'Maven is widely used for dependency management and project builds.' },
    { stem: 'Which Maven file contains project dependencies?', options: ['settings.xml', 'pom.xml', 'build.xml', 'config.xml'], answer: 1, explanation: 'pom.xml contains project dependencies and plugins.' },
    { stem: 'Which Maven lifecycle phase compiles Java source code?', options: ['test', 'compile', 'package', 'install'], answer: 1, explanation: 'The compile phase compiles the project source code.' },
    { stem: 'Which Maven command executes Selenium TestNG tests?', options: ['mvn clean install', 'mvn compile', 'mvn test', 'mvn package'], answer: 2, explanation: 'mvn test compiles and executes test cases.' },
    { stem: 'Which framework architecture is considered best for enterprise Selenium automation?', options: ['Linear Framework', 'Keyword Driven Only', 'Hybrid Framework with Page Object Model', 'Record and Playback'], answer: 2, explanation: 'A Hybrid Framework combining POM, Data-Driven and Keyword-Driven approaches is considered the industry best practice.' }

],
  'rest-api-testing': [
    { stem: 'What does API stand for?', options: ['Application Programming Interface', 'Application Process Integration', 'Advanced Programming Interface', 'Automated Program Interaction'], answer: 0, explanation: 'API stands for Application Programming Interface, which enables communication between software systems.' },
    { stem: 'Which API architecture is most commonly used for web services today?', options: ['SOAP', 'REST', 'RPC', 'GraphQL'], answer: 1, explanation: 'REST is the most widely adopted architecture for modern web services.' },
    { stem: 'What does REST stand for?', options: ['Remote State Transfer', 'Representational State Transfer', 'Resource State Transfer', 'Remote Service Technology'], answer: 1, explanation: 'REST stands for Representational State Transfer.' },
    { stem: 'Which HTTP method is primarily used to retrieve data?', options: ['POST', 'PUT', 'GET', 'DELETE'], answer: 2, explanation: 'GET is used to retrieve resources from a server.' },
    { stem: 'Which HTTP method is typically used to create a new resource?', options: ['POST', 'GET', 'PUT', 'PATCH'], answer: 0, explanation: 'POST creates new resources on the server.' },
    { stem: 'Which HTTP method completely updates an existing resource?', options: ['PATCH', 'PUT', 'POST', 'GET'], answer: 1, explanation: 'PUT replaces the entire resource.' },
    { stem: 'Which HTTP method is used for partial updates?', options: ['PUT', 'PATCH', 'POST', 'DELETE'], answer: 1, explanation: 'PATCH updates only the specified fields of a resource.' },
    { stem: 'Which HTTP method deletes a resource?', options: ['REMOVE', 'DELETE', 'POST', 'PATCH'], answer: 1, explanation: 'DELETE removes the specified resource from the server.' },
    { stem: 'Which HTTP method retrieves only response headers?', options: ['OPTIONS', 'TRACE', 'HEAD', 'CONNECT'], answer: 2, explanation: 'HEAD returns headers without the response body.' },
    { stem: 'Which HTTP status code indicates a successful request?', options: ['404', '500', '200', '401'], answer: 2, explanation: '200 OK indicates that the request was successful.' },
    { stem: 'Which HTTP status code indicates a resource was successfully created?', options: ['200', '201', '204', '302'], answer: 1, explanation: '201 Created is returned after successful resource creation.' },
    { stem: 'Which HTTP status code indicates no content is returned?', options: ['200', '201', '204', '205'], answer: 2, explanation: '204 No Content indicates success with an empty response body.' },
    { stem: 'Which HTTP status code indicates a bad request from the client?', options: ['401', '403', '400', '404'], answer: 2, explanation: '400 Bad Request indicates an invalid client request.' },
    { stem: 'Which HTTP status code indicates authentication is required?', options: ['401', '403', '404', '500'], answer: 0, explanation: '401 Unauthorized indicates authentication is required.' },
    { stem: 'Which HTTP status code indicates access is forbidden?', options: ['400', '401', '403', '404'], answer: 2, explanation: '403 Forbidden means the client is authenticated but lacks permission.' },
    { stem: 'Which HTTP status code indicates the requested resource was not found?', options: ['400', '401', '403', '404'], answer: 3, explanation: '404 Not Found indicates the requested resource does not exist.' },
    { stem: 'Which HTTP status code indicates an internal server error?', options: ['500', '404', '400', '301'], answer: 0, explanation: '500 Internal Server Error indicates an unexpected server-side failure.' },
    { stem: 'Which data format is most commonly used in REST APIs?', options: ['CSV', 'XML', 'JSON', 'YAML'], answer: 2, explanation: 'JSON is lightweight and widely used for REST APIs.' },
    { stem: 'Which data format is traditionally used in SOAP web services?', options: ['JSON', 'XML', 'CSV', 'YAML'], answer: 1, explanation: 'SOAP messages are XML-based.' },
    { stem: 'What is an endpoint in API testing?', options: ['A database table', 'A server URL where an API can be accessed', 'A programming language', 'A browser plugin'], answer: 1, explanation: 'An endpoint is the URL through which an API resource is accessed.' },
    { stem: 'Which REST constraint requires each request to contain all necessary information?', options: ['Cacheable', 'Layered System', 'Stateless', 'Uniform Interface'], answer: 2, explanation: 'REST APIs are stateless; every request contains all required information.' },
    { stem: 'Which HTTP method should be idempotent?', options: ['POST', 'PUT', 'DELETE', 'Both PUT and DELETE'], answer: 3, explanation: 'PUT and DELETE are idempotent because repeated requests produce the same result.' },
    { stem: 'Which protocol is primarily used by REST APIs?', options: ['SMTP', 'HTTP/HTTPS', 'FTP', 'TCP Only'], answer: 1, explanation: 'REST APIs are commonly built on HTTP or HTTPS.' },
    { stem: 'Which protocol is primarily associated with SOAP web services?', options: ['HTTP only', 'SMTP only', 'HTTP, SMTP and others', 'FTP'], answer: 2, explanation: 'SOAP supports multiple transport protocols including HTTP and SMTP.' },
    { stem: 'Which of the following is a major advantage of REST over SOAP?', options: ['Uses only XML', 'Lightweight and faster using JSON', 'Requires WSDL', 'Supports only POST requests'], answer: 1, explanation: 'REST commonly uses JSON, making it lightweight and easier to consume than SOAP.' },
    { stem: 'What is the purpose of an HTTP request header?', options: ['Store response data', 'Send metadata about the request', 'Define database schema', 'Compress the response'], answer: 1, explanation: 'Request headers provide metadata such as content type, authorization and accepted formats.' },
    { stem: 'Which HTTP header specifies the format of the request body?', options: ['Accept', 'Authorization', 'Content-Type', 'Host'], answer: 2, explanation: 'Content-Type specifies the media type of the request body.' },
    { stem: 'Which HTTP header specifies the response format expected by the client?', options: ['Accept', 'Content-Type', 'Cache-Control', 'Host'], answer: 0, explanation: 'The Accept header tells the server which response format the client expects.' },
    { stem: 'Which Content-Type is commonly used for REST APIs?', options: ['text/plain', 'application/json', 'application/xml', 'multipart/form-data'], answer: 1, explanation: 'application/json is the most commonly used content type in REST APIs.' },
    { stem: 'Which Content-Type is commonly used when uploading files?', options: ['application/json', 'application/xml', 'multipart/form-data', 'text/html'], answer: 2, explanation: 'multipart/form-data is used for file uploads.' },
    { stem: 'What is a query parameter?', options: ['A value included in the URL after ?', 'A request header', 'A response header', 'A JSON object'], answer: 0, explanation: 'Query parameters are appended to the URL after the ? character.' },
    { stem: 'Which URL contains a query parameter?', options: ['/users/10', '/users?id=10', '/users/{id}', '/users:id'], answer: 1, explanation: 'Query parameters appear after the ? symbol.' },
    { stem: 'What is a path parameter?', options: ['A parameter inside the URL path', 'A request header', 'A cookie', 'A response body'], answer: 0, explanation: 'Path parameters are embedded directly within the URL path.' },
    { stem: 'Which URL contains a path parameter?', options: ['/users?id=5', '/users/5', '/users?name=John', '/users#5'], answer: 1, explanation: 'The resource identifier is part of the URL path.' },
    { stem: 'Which HTTP header is commonly used to send authentication tokens?', options: ['Accept', 'Authorization', 'Content-Type', 'Cookie'], answer: 1, explanation: 'Authorization carries credentials such as Bearer tokens.' },
    { stem: 'Which response body format is easiest for humans to read?', options: ['Binary', 'JSON', 'Hexadecimal', 'Base64'], answer: 1, explanation: 'JSON is lightweight and human-readable.' },
    { stem: 'Which JSON object represents an array?', options: ['{ }', '[ ]', '( )', '< >'], answer: 1, explanation: 'Arrays in JSON are enclosed in square brackets.' },
    { stem: 'Which JSON structure stores key-value pairs?', options: ['Array', 'Object', 'List', 'Tuple'], answer: 1, explanation: 'JSON objects store data as key-value pairs.' },
    { stem: 'Which response field typically contains the HTTP status code?', options: ['headers', 'statusCode', 'body', 'cookies'], answer: 1, explanation: 'The status code indicates the result of the HTTP request.' },
    { stem: 'What is response validation?', options: ['Checking database values only', 'Verifying status code, headers and response body', 'Sending requests repeatedly', 'Creating API endpoints'], answer: 1, explanation: 'Response validation ensures the API returns the expected result.' },
    { stem: 'Which status code range represents successful HTTP responses?', options: ['100-199', '200-299', '300-399', '400-499'], answer: 1, explanation: 'HTTP 2xx status codes indicate successful requests.' },
    { stem: 'Which status code range represents client errors?', options: ['100-199', '200-299', '300-399', '400-499'], answer: 3, explanation: 'HTTP 4xx status codes indicate client-side errors.' },
    { stem: 'Which status code range represents server errors?', options: ['200-299', '300-399', '400-499', '500-599'], answer: 3, explanation: 'HTTP 5xx status codes indicate server-side failures.' },
    { stem: 'Which HTTP response header identifies the type of response body?', options: ['Accept', 'Content-Type', 'Authorization', 'Location'], answer: 1, explanation: 'Content-Type identifies the media type of the response.' },
    { stem: 'Which HTTP header controls caching behavior?', options: ['Host', 'Cache-Control', 'Origin', 'Referer'], answer: 1, explanation: 'Cache-Control defines caching policies for requests and responses.' },
    { stem: 'Which API response field usually contains the returned business data?', options: ['Headers', 'Body', 'Status Code', 'Cookies'], answer: 1, explanation: 'The response body contains the actual data returned by the API.' },
    { stem: 'What is the primary purpose of API response headers?', options: ['Store database records', 'Provide metadata about the response', 'Replace the response body', 'Encrypt the request'], answer: 1, explanation: 'Response headers contain metadata such as content type, caching and server information.' },
    { stem: 'Which HTTP method commonly uses a request body?', options: ['GET', 'HEAD', 'POST', 'OPTIONS'], answer: 2, explanation: 'POST requests typically include a request body.' },
    { stem: 'Which HTTP method generally should not contain a request body?', options: ['POST', 'PUT', 'GET', 'PATCH'], answer: 2, explanation: 'GET requests typically retrieve resources and usually do not include a request body.' },
    { stem: 'Which validation is commonly performed during API testing?', options: ['Verify database indexes only', 'Verify status code, headers, response body and response time', 'Verify browser compatibility only', 'Verify UI alignment'], answer: 1, explanation: 'API testing validates response status, headers, body, schema and performance.' },
    { stem: 'Which authentication method sends the username and password encoded in Base64?', options: ['Bearer Token', 'OAuth 2.0', 'Basic Authentication', 'JWT'], answer: 2, explanation: 'Basic Authentication sends the username and password encoded in Base64.' },
    { stem: 'Which HTTP header is commonly used for Basic Authentication?', options: ['Authentication', 'Authorization', 'Auth', 'Token'], answer: 1, explanation: 'The Authorization header carries Basic Authentication credentials.' },
    { stem: 'Which authentication mechanism uses an access token?', options: ['Basic Authentication', 'Bearer Authentication', 'Digest Authentication', 'NTLM'], answer: 1, explanation: 'Bearer Authentication uses an access token instead of a username and password.' },
    { stem: 'What is the typical format of a Bearer token header?', options: ['Bearer <token>', 'Token <value>', 'Auth <token>', 'Basic <token>'], answer: 0, explanation: 'Bearer tokens are sent as "Authorization: Bearer <token>".' },
    { stem: 'What does JWT stand for?', options: ['Java Web Token', 'JSON Web Token', 'JavaScript Web Token', 'JSON Wrapper Token'], answer: 1, explanation: 'JWT stands for JSON Web Token.' },
    { stem: 'A JWT token consists of how many parts?', options: ['2', '3', '4', '5'], answer: 1, explanation: 'A JWT consists of Header, Payload, and Signature.' },
    { stem: 'Which character separates the three parts of a JWT?', options: ['/', '-', '.', ':'], answer: 2, explanation: 'JWT components are separated by periods (.).' },
    { stem: 'Which part of a JWT contains user information?', options: ['Header', 'Payload', 'Signature', 'Footer'], answer: 1, explanation: 'The Payload contains claims and user-related information.' },
    { stem: 'Which part of a JWT ensures token integrity?', options: ['Header', 'Payload', 'Signature', 'Body'], answer: 2, explanation: 'The Signature verifies that the token has not been modified.' },
    { stem: 'Which authentication framework is widely used for secure API authorization?', options: ['OAuth 2.0', 'SOAP', 'SMTP', 'FTP'], answer: 0, explanation: 'OAuth 2.0 is the industry standard for authorization.' },
    { stem: 'What is the primary purpose of OAuth 2.0?', options: ['Encryption', 'Authorization', 'Compression', 'Caching'], answer: 1, explanation: 'OAuth 2.0 provides secure delegated authorization.' },
    { stem: 'Which OAuth 2.0 token is used to access protected resources?', options: ['Refresh Token', 'Access Token', 'Session Token', 'Identity Token'], answer: 1, explanation: 'Access Tokens are used to access protected APIs.' },
    { stem: 'Which OAuth token is used to obtain a new Access Token?', options: ['Bearer Token', 'JWT', 'Refresh Token', 'Security Token'], answer: 2, explanation: 'Refresh Tokens are used to request a new Access Token.' },
    { stem: 'Which OAuth 2.0 grant type is commonly used for machine-to-machine communication?', options: ['Authorization Code', 'Implicit', 'Client Credentials', 'Password'], answer: 2, explanation: 'Client Credentials Grant is intended for server-to-server communication.' },
    { stem: 'Which OAuth 2.0 grant type is commonly used by web applications?', options: ['Authorization Code', 'Client Credentials', 'Password', 'Implicit'], answer: 0, explanation: 'Authorization Code Grant is recommended for web applications.' },
    { stem: 'What is API authorization?', options: ['Verifying user identity', 'Determining what resources a user can access', 'Encrypting requests', 'Caching responses'], answer: 1, explanation: 'Authorization determines the permissions granted to an authenticated user.' },
    { stem: 'What is API authentication?', options: ['Checking user permissions', 'Verifying user identity', 'Validating JSON Schema', 'Creating API endpoints'], answer: 1, explanation: 'Authentication verifies the identity of the client.' },
    { stem: 'What is the purpose of cookies in API testing?', options: ['Store authentication/session information', 'Store database records', 'Compress responses', 'Increase response speed'], answer: 0, explanation: 'Cookies commonly maintain user sessions and authentication.' },
    { stem: 'Which HTTP header carries cookies to the server?', options: ['Cookie', 'Cookies', 'Set-Cookie', 'Authorization'], answer: 0, explanation: 'The Cookie header sends cookies from the client to the server.' },
    { stem: 'Which HTTP response header instructs the browser to store a cookie?', options: ['Cookie', 'Set-Cookie', 'Authorization', 'Session'], answer: 1, explanation: 'The Set-Cookie header instructs the client to store cookies.' },
    { stem: 'What is a session in API testing?', options: ['A database table', 'A temporary interaction between client and server', 'A JSON object', 'An HTTP method'], answer: 1, explanation: 'A session maintains state between multiple client requests.' },
    { stem: 'What does a 401 Unauthorized response usually indicate?', options: ['Authentication failed or missing', 'Server crashed', 'Resource not found', 'Successful request'], answer: 0, explanation: '401 indicates invalid or missing authentication credentials.' },
    { stem: 'Which authentication method is considered more secure than Basic Authentication?', options: ['Bearer Token', 'Plain Text', 'Anonymous Access', 'FTP Authentication'], answer: 0, explanation: 'Bearer tokens avoid repeatedly transmitting usernames and passwords.' },
    { stem: 'Which token should never be exposed publicly because it can directly access protected resources?', options: ['Refresh Token', 'Access Token', 'CSRF Token', 'Session ID'], answer: 1, explanation: 'An Access Token grants access to protected APIs and must be protected.' },
    { stem: 'Which API testing activity verifies that protected endpoints cannot be accessed without valid credentials?', options: ['Load Testing', 'Authentication Testing', 'Performance Testing', 'Smoke Testing'], answer: 1, explanation: 'Authentication testing ensures secured endpoints reject unauthorized access.' },
    { stem: 'Which Java library is most commonly used for REST API automation?', options: ['Selenium', 'REST Assured', 'JUnit', 'Apache POI'], answer: 1, explanation: 'REST Assured is the most widely used Java library for REST API automation.' },
    { stem: 'Which static class is commonly imported to start a REST Assured request?', options: ['Response', 'RequestSpecification', 'RestAssured', 'JsonPath'], answer: 2, explanation: 'The RestAssured class provides methods such as given(), when() and then().' },
    { stem: 'Which REST Assured method starts building an HTTP request?', options: ['when()', 'given()', 'then()', 'request()'], answer: 1, explanation: 'given() initializes the request specification.' },
    { stem: 'Which REST Assured method sends the HTTP request?', options: ['given()', 'when()', 'execute()', 'send()'], answer: 1, explanation: 'when() is followed by the HTTP method such as get(), post(), put() or delete().' },
    { stem: 'Which REST Assured method is used for response validation?', options: ['verify()', 'check()', 'then()', 'assert()'], answer: 2, explanation: 'then() is used to validate the response.' },
    { stem: 'Which method sends a GET request in REST Assured?', options: ['fetch()', 'retrieve()', 'get()', 'read()'], answer: 2, explanation: 'get() sends an HTTP GET request.' },
    { stem: 'Which method sends a POST request?', options: ['create()', 'insert()', 'post()', 'save()'], answer: 2, explanation: 'post() sends an HTTP POST request.' },
    { stem: 'Which method sends a PUT request?', options: ['update()', 'put()', 'modify()', 'replace()'], answer: 1, explanation: 'put() replaces an existing resource.' },
    { stem: 'Which method sends a DELETE request?', options: ['remove()', 'delete()', 'erase()', 'drop()'], answer: 1, explanation: 'delete() removes the specified resource.' },
    { stem: 'Which REST Assured method adds a request header?', options: ['header()', 'headersOnly()', 'addHeader()', 'setHeader()'], answer: 0, explanation: 'header() adds a single request header.' },
    { stem: 'Which REST Assured method adds query parameters?', options: ['queryParam()', 'param()', 'query()', 'parameter()'], answer: 0, explanation: 'queryParam() adds query parameters to the request URL.' },
    { stem: 'Which REST Assured method adds path parameters?', options: ['path()', 'pathParam()', 'urlParam()', 'resourceParam()'], answer: 1, explanation: 'pathParam() substitutes values into URI path placeholders.' },
    { stem: 'Which REST Assured method adds cookies to a request?', options: ['cookie()', 'cookiesOnly()', 'addCookie()', 'setCookie()'], answer: 0, explanation: 'cookie() adds one or more cookies to the request.' },
    { stem: 'Which REST Assured method specifies the request body?', options: ['payload()', 'requestBody()', 'body()', 'content()'], answer: 2, explanation: 'body() specifies the request payload.' },
    { stem: 'Which class stores the HTTP response in REST Assured?', options: ['Request', 'Response', 'Result', 'HttpResponse'], answer: 1, explanation: 'The Response class stores the API response.' },
    { stem: 'Which REST Assured method validates the response status code?', options: ['status()', 'statusCode()', 'verifyStatus()', 'responseCode()'], answer: 1, explanation: 'statusCode() validates the HTTP status code.' },
    { stem: 'Which REST Assured method validates a value inside the response body?', options: ['body()', 'validateBody()', 'json()', 'assertBody()'], answer: 0, explanation: 'body() is commonly used with Hamcrest matchers for validation.' },
    { stem: 'Which Hamcrest matcher verifies equality?', options: ['equalTo()', 'equals()', 'isEqual()', 'sameAs()'], answer: 0, explanation: 'equalTo() verifies that the actual value matches the expected value.' },
    { stem: 'Which class is commonly used to extract values from a JSON response?', options: ['JsonPath', 'JsonParser', 'JSONObject', 'JsonReader'], answer: 0, explanation: 'JsonPath simplifies extracting fields from JSON responses.' },
    { stem: 'Which REST Assured method extracts the response after validation?', options: ['extract()', 'fetch()', 'retrieve()', 'read()'], answer: 0, explanation: 'extract() retrieves values from the validated response.' },
    { stem: 'What is serialization in API testing?', options: ['Converting Java objects into JSON/XML', 'Reading JSON files', 'Compressing responses', 'Encrypting payloads'], answer: 0, explanation: 'Serialization converts Java objects into JSON or XML before sending the request.' },
    { stem: 'What is deserialization?', options: ['Compressing JSON', 'Converting JSON/XML into Java objects', 'Encrypting requests', 'Creating HTTP headers'], answer: 1, explanation: 'Deserialization converts API responses into Java objects.' },
    { stem: 'Which annotation is commonly used in Jackson to ignore unknown JSON properties?', options: ['@JsonIgnoreProperties', '@Ignore', '@JsonSkip', '@IgnoreUnknown'], answer: 0, explanation: '@JsonIgnoreProperties(ignoreUnknown = true) ignores unmapped JSON fields.' },
    { stem: 'Which library is commonly used with REST Assured for JSON serialization and deserialization?', options: ['Jackson', 'Log4j', 'Apache POI', 'TestNG'], answer: 0, explanation: 'Jackson is the most commonly used JSON processing library with REST Assured.' },
    { stem: 'Which practice is recommended when validating API responses?', options: ['Validate only the status code', 'Validate status code, headers, response body and schema', 'Validate only response time', 'Validate only JSON fields'], answer: 1, explanation: 'Comprehensive API validation should include status code, headers, payload, schema and response time.' }
],
'api-advanced': [
  { stem: 'Which tool is most commonly used for manual API testing?', options: ['Selenium', 'Postman', 'JMeter', 'Appium'], answer: 1, explanation: 'Postman is the most widely used tool for manual API testing.' },
    { stem: 'What is a Postman Collection?', options: ['A database', 'A group of API requests', 'A JSON parser', 'A report'], answer: 1, explanation: 'A Collection organizes related API requests.' },
    { stem: 'Which feature allows reusing values across multiple requests in Postman?', options: ['Assertions', 'Variables', 'Headers', 'Cookies'], answer: 1, explanation: 'Variables help reuse values like URLs and tokens.' },
    { stem: 'Which type of Postman variable has the highest scope?', options: ['Local Variable', 'Collection Variable', 'Environment Variable', 'Global Variable'], answer: 3, explanation: 'Global Variables are accessible across all collections.' },
    { stem: 'Which variable scope is commonly used for different environments like Dev, QA and Production?', options: ['Global', 'Collection', 'Environment', 'Local'], answer: 2, explanation: 'Environment variables allow switching between environments easily.' },
    { stem: 'Which tab in Postman is used to write automated validation scripts?', options: ['Headers', 'Authorization', 'Tests', 'Cookies'], answer: 2, explanation: 'The Tests tab contains JavaScript assertions executed after receiving a response.' },
    { stem: 'Which tab is used to execute scripts before sending a request?', options: ['Tests', 'Pre-request Script', 'Authorization', 'Settings'], answer: 1, explanation: 'Pre-request scripts execute before the request is sent.' },
    { stem: 'Which JavaScript object is used for writing assertions in Postman?', options: ['pm', 'postman', 'assert', 'api'], answer: 0, explanation: 'The pm object provides APIs for assertions, variables and request handling.' },
    { stem: 'Which statement verifies that the response status code is 200?', options: ['pm.response.code == 200', 'pm.expect(pm.response.code).to.equal(200)', 'response.status==200', 'assert.status(200)'], answer: 1, explanation: 'pm.expect() is commonly used with the Chai assertion library.' },
    { stem: 'Which Postman object retrieves the response body as JSON?', options: ['pm.response.body()', 'pm.response.json()', 'pm.body()', 'response.json()'], answer: 1, explanation: 'pm.response.json() converts the response into a JavaScript object.' },
    { stem: 'Which Postman function verifies response time?', options: ['pm.response.responseTime', 'pm.response.time()', 'pm.time()', 'pm.response.duration()'], answer: 0, explanation: 'responseTime returns the API response duration in milliseconds.' },
    { stem: 'Which Postman feature is used to chain API requests?', options: ['Environment Variables', 'Collections', 'Request Dependencies', 'Scenarios'], answer: 0, explanation: 'Variables allow values from one response to be reused in subsequent requests.' },
    { stem: 'Which Postman method saves a variable?', options: ['pm.variables.save()', 'pm.environment.set()', 'pm.variable()', 'pm.save()'], answer: 1, explanation: 'pm.environment.set() stores values in the active environment.' },
    { stem: 'Which method retrieves an environment variable?', options: ['pm.environment.get()', 'pm.get()', 'pm.variable()', 'pm.fetch()'], answer: 0, explanation: 'pm.environment.get() retrieves an environment variable.' },
    { stem: 'What is Newman?', options: ['REST Assured Plugin', 'Command-line Collection Runner for Postman', 'JSON Validator', 'HTTP Proxy'], answer: 1, explanation: 'Newman executes Postman collections from the command line.' },
    { stem: 'Which command executes a Postman collection using Newman?', options: ['newman execute collection.json', 'newman run collection.json', 'postman run collection.json', 'npm run newman'], answer: 1, explanation: 'newman run executes a Postman collection.' },
    { stem: 'Which file format is used to export a Postman collection?', options: ['XML', 'JSON', 'CSV', 'YAML'], answer: 1, explanation: 'Postman collections are exported in JSON format.' },
    { stem: 'Which report format can Newman generate?', options: ['HTML', 'JSON', 'JUnit XML', 'All of the above'], answer: 3, explanation: 'Newman supports multiple reporters including HTML, JSON and JUnit.' },
    { stem: 'Which assertion verifies that a JSON response contains a specific property?', options: ['pm.expect(obj).to.have.property()', 'pm.has()', 'assert.property()', 'pm.contains()'], answer: 0, explanation: 'The Chai property matcher verifies object properties.' },
    { stem: 'Which assertion verifies that a response body contains a specific text?', options: ['pm.response.text().includes()', 'pm.expect(pm.response.text()).to.include()', 'pm.response.contains()', 'assert.text()'], answer: 1, explanation: 'include() verifies partial text in the response.' },
    { stem: 'Which Postman feature allows running the same request with multiple datasets?', options: ['Collection Runner', 'Environment', 'Workspace', 'Monitor'], answer: 0, explanation: 'Collection Runner supports data-driven execution using CSV or JSON files.' },
    { stem: 'Which file formats are supported for data-driven execution in Collection Runner?', options: ['CSV and JSON', 'XML and CSV', 'Excel Only', 'YAML Only'], answer: 0, explanation: 'Collection Runner accepts CSV and JSON data files.' },
    { stem: 'Which Postman feature automatically runs collections at scheduled intervals?', options: ['Collection Runner', 'Monitors', 'Workspaces', 'History'], answer: 1, explanation: 'Postman Monitors execute collections on a schedule.' },
    { stem: 'Which Postman feature enables team collaboration?', options: ['Workspace', 'Collection Runner', 'Environment', 'Console'], answer: 0, explanation: 'Workspaces allow teams to collaborate on API development and testing.' },
    { stem: 'Which is considered a best practice while using Postman?', options: ['Hardcode URLs and tokens', 'Use variables, assertions and environments', 'Store passwords in requests', 'Duplicate requests for each environment'], answer: 1, explanation: 'Using variables, assertions and environments improves maintainability and reusability.' },
    { stem: 'Which REST Assured feature validates the JSON response structure?', options: ['JsonPath', 'JSON Schema Validation', 'Serialization', 'Logging'], answer: 1, explanation: 'JSON Schema Validation verifies that the response matches the expected JSON schema.' },
    { stem: 'Which REST Assured module is commonly used for JSON Schema Validation?', options: ['json-schema-validator', 'json-validator', 'schema-checker', 'jackson-validator'], answer: 0, explanation: 'The json-schema-validator module validates JSON responses against schemas.' },
    { stem: 'Which REST Assured method enables logging of the complete request?', options: ['log().all()', 'print()', 'requestLog()', 'debug()'], answer: 0, explanation: 'log().all() prints the complete HTTP request.' },
    { stem: 'Which REST Assured method logs only the request headers?', options: ['log().headers()', 'log().header()', 'printHeaders()', 'headersLog()'], answer: 0, explanation: 'log().headers() prints all request headers.' },
    { stem: 'Which REST Assured method logs only the request body?', options: ['log().body()', 'printBody()', 'bodyLog()', 'requestBody()'], answer: 0, explanation: 'log().body() prints only the request payload.' },
    { stem: 'Which REST Assured method logs the complete response?', options: ['response().all()', 'then().log().all()', 'logResponse()', 'printResponse()'], answer: 1, explanation: 'then().log().all() prints the complete HTTP response.' },
    { stem: 'Which REST Assured method logs the response body?', options: ['then().log().body()', 'responseBody()', 'printBody()', 'logBody()'], answer: 0, explanation: 'log().body() prints only the response body.' },
    { stem: 'Which REST Assured method logs the response headers?', options: ['then().log().headers()', 'responseHeaders()', 'headers()', 'printHeaders()'], answer: 0, explanation: 'log().headers() prints the response headers.' },
    { stem: 'Which feature allows custom processing of requests and responses in REST Assured?', options: ['Filters', 'Listeners', 'Hooks', 'Handlers'], answer: 0, explanation: 'Filters intercept requests and responses for logging or modification.' },
    { stem: 'Which built-in REST Assured filter logs both request and response?', options: ['RequestLoggingFilter', 'ResponseLoggingFilter', 'ErrorLoggingFilter', 'RequestLoggingFilter and ResponseLoggingFilter'], answer: 3, explanation: 'Both filters together provide complete request and response logging.' },
    { stem: 'Which REST Assured filter logs only failed validations?', options: ['ValidationFilter', 'ErrorLoggingFilter', 'FailureFilter', 'AssertFilter'], answer: 1, explanation: 'ErrorLoggingFilter logs responses only when validation fails.' },
    { stem: 'Which REST Assured class is commonly used for reusable request specifications?', options: ['RequestSpecification', 'ResponseSpecification', 'RequestBuilder', 'RestBuilder'], answer: 0, explanation: 'RequestSpecification stores reusable request configuration.' },
    { stem: 'Which REST Assured class is used for reusable response validations?', options: ['ResponseSpecification', 'RequestSpecification', 'ValidationSpecification', 'ResponseBuilder'], answer: 0, explanation: 'ResponseSpecification defines reusable response expectations.' },
    { stem: 'Which builder creates reusable request specifications?', options: ['RequestSpecBuilder', 'RequestBuilder', 'SpecBuilder', 'RestBuilder'], answer: 0, explanation: 'RequestSpecBuilder builds reusable RequestSpecification objects.' },
    { stem: 'Which builder creates reusable response specifications?', options: ['ResponseBuilder', 'ResponseSpecBuilder', 'SpecBuilder', 'ValidationBuilder'], answer: 1, explanation: 'ResponseSpecBuilder creates reusable ResponseSpecification objects.' },
    { stem: 'Which method applies a reusable request specification?', options: ['requestSpec()', 'spec()', 'applySpec()', 'useSpec()'], answer: 1, explanation: 'spec() applies a reusable RequestSpecification.' },
    { stem: 'Which method applies a reusable response specification?', options: ['responseSpec()', 'validateSpec()', 'spec()', 'applyResponse()'], answer: 2, explanation: 'then().spec() validates using a reusable ResponseSpecification.' },
    { stem: 'Which REST Assured feature simplifies validating nested JSON values?', options: ['JsonPath', 'XPath', 'SchemaPath', 'TreePath'], answer: 0, explanation: 'JsonPath allows easy navigation of nested JSON objects.' },
    { stem: 'Which JsonPath expression accesses the city field inside address?', options: ['address.city', '$.city', '/address/city', 'city.address'], answer: 0, explanation: 'Dot notation accesses nested JSON properties.' },
    { stem: 'Which JsonPath expression retrieves the first element of an array named employees?', options: ['employees[0]', 'employees.first()', 'employees(0)', '/employees/0'], answer: 0, explanation: 'Arrays are indexed starting from zero.' },
    { stem: 'Which validation checks that the response matches the expected data type and structure?', options: ['Status Validation', 'Schema Validation', 'Header Validation', 'Cookie Validation'], answer: 1, explanation: 'Schema validation ensures the response structure is correct.' },
    { stem: 'Which REST Assured feature reduces duplicate code across multiple API tests?', options: ['Filters', 'Specifications', 'Serialization', 'Assertions'], answer: 1, explanation: 'Reusable specifications eliminate repeated request configuration.' },
    { stem: 'Which logging strategy is recommended for production automation frameworks?', options: ['Disable all logging', 'Log only failures by default', 'Always log every request', 'Print to console only'], answer: 1, explanation: 'Logging only failures keeps reports clean while providing debugging information.' },
    { stem: 'Why are reusable RequestSpecifications recommended?', options: ['Improve performance only', 'Reduce duplicate code and improve maintainability', 'Increase response time', 'Generate reports automatically'], answer: 1, explanation: 'Reusable specifications make API automation frameworks easier to maintain.' },
    { stem: 'Which practice is considered best for enterprise REST Assured frameworks?', options: ['Hardcode URLs and headers', 'Use reusable specifications, logging, schema validation and utility classes', 'Use only POST requests', 'Disable assertions'], answer: 1, explanation: 'Enterprise frameworks emphasize reusability, maintainability, centralized configuration and comprehensive validation.' },
    { stem: 'Which testing framework is most commonly integrated with REST Assured?', options: ['JUnit/TestNG', 'Selenium IDE', 'Cypress', 'Appium'], answer: 0, explanation: 'REST Assured is commonly integrated with JUnit and TestNG.' },
    { stem: 'Which build tool is most commonly used with REST Assured projects?', options: ['Ant', 'Maven', 'Gradle Wrapper Only', 'Make'], answer: 1, explanation: 'Maven is widely used for dependency management and project builds.' },
    { stem: 'Which Maven file manages project dependencies?', options: ['settings.xml', 'pom.xml', 'build.xml', 'manifest.xml'], answer: 1, explanation: 'pom.xml defines dependencies, plugins and project configuration.' },
    { stem: 'Which Maven command compiles and executes API tests?', options: ['mvn package', 'mvn test', 'mvn verify-only', 'mvn run'], answer: 1, explanation: 'mvn test compiles the project and executes test cases.' },
    { stem: 'Which TestNG annotation executes before each API test method?', options: ['@BeforeSuite', '@BeforeMethod', '@BeforeTest', '@BeforeClass'], answer: 1, explanation: '@BeforeMethod runs before every test method.' },
    { stem: 'Which TestNG annotation executes after every API test?', options: ['@AfterSuite', '@AfterMethod', '@AfterTest', '@AfterClass'], answer: 1, explanation: '@AfterMethod executes after each test method.' },
    { stem: 'Which TestNG feature executes the same API test using multiple datasets?', options: ['RetryAnalyzer', 'DataProvider', 'Factory', 'Groups'], answer: 1, explanation: 'DataProvider supports data-driven API testing.' },
    { stem: 'Which TestNG annotation receives values from testng.xml?', options: ['@DataProvider', '@Parameters', '@Factory', '@Config'], answer: 1, explanation: '@Parameters injects values defined in testng.xml.' },
    { stem: 'Which TestNG feature allows grouping API test cases?', options: ['priority', 'groups', 'listeners', 'parallel'], answer: 1, explanation: 'The groups attribute organizes related test cases.' },
    { stem: 'Which framework design pattern separates test logic from API request logic?', options: ['Singleton', 'Page Object Model', 'API Object Model', 'MVC'], answer: 2, explanation: 'API Object Model separates endpoints and request logic from test cases.' },
    { stem: 'What is the purpose of a BaseTest class in an API framework?', options: ['Store JSON files', 'Provide common setup and teardown', 'Generate reports', 'Execute SQL queries'], answer: 1, explanation: 'BaseTest centralizes common initialization and cleanup logic.' },
    { stem: 'What is the purpose of a BaseURI configuration?', options: ['Store database URL', 'Avoid repeating server URLs', 'Generate reports', 'Validate schemas'], answer: 1, explanation: 'BaseURI centralizes the server address for all requests.' },
    { stem: 'Where should reusable request specifications be stored?', options: ['Each test class', 'Utility/Common classes', 'Feature files', 'JSON files only'], answer: 1, explanation: 'Utility classes improve maintainability by avoiding duplication.' },
    { stem: 'Which reporting framework is commonly integrated with REST Assured?', options: ['Allure Report', 'Crystal Reports', 'Power BI', 'JasperReports'], answer: 0, explanation: 'Allure provides rich API execution reports.' },
    { stem: 'Which CI/CD tool commonly executes REST Assured automation suites?', options: ['Jenkins', 'Photoshop', 'Excel', 'Docker Desktop'], answer: 0, explanation: 'Jenkins is widely used for continuous integration.' },
    { stem: 'Which source control system is most commonly used with API automation projects?', options: ['Git', 'SVN Only', 'FTP', 'Dropbox'], answer: 0, explanation: 'Git is the industry standard for version control.' },
    { stem: 'Which Jenkins file defines a CI/CD pipeline?', options: ['pom.xml', 'Dockerfile', 'Jenkinsfile', 'settings.xml'], answer: 2, explanation: 'Jenkinsfile contains the pipeline definition.' },
    { stem: 'Which Maven Surefire plugin is responsible for executing TestNG tests?', options: ['maven-compiler-plugin', 'maven-surefire-plugin', 'maven-install-plugin', 'maven-clean-plugin'], answer: 1, explanation: 'Surefire executes unit and TestNG tests during the test phase.' },
    { stem: 'Which API framework component stores endpoint URLs?', options: ['Test Classes', 'Endpoint/Routes Class', 'Reports', 'Runner Class'], answer: 1, explanation: 'Endpoint classes centralize API URLs for easy maintenance.' },
    { stem: 'Which file format is commonly used for API request payloads?', options: ['JSON', 'MP3', 'DOCX', 'PNG'], answer: 0, explanation: 'JSON is the standard request payload format for REST APIs.' },
    { stem: 'Which framework practice improves maintainability the most?', options: ['Hardcoding endpoints', 'Centralizing configuration and reusable utilities', 'Duplicating request code', 'Using Thread.sleep()'], answer: 1, explanation: 'Reusable utilities and centralized configuration simplify maintenance.' },
    { stem: 'Which environment configuration file commonly stores QA, UAT and Production URLs?', options: ['config.properties', 'README.md', 'package.json', 'index.html'], answer: 0, explanation: 'Properties files are commonly used for environment-specific configuration.' },
    { stem: 'Which logging framework is commonly used in Java API automation?', options: ['Log4j', 'JUnit', 'Mockito', 'Lombok'], answer: 0, explanation: 'Log4j provides configurable application logging.' },
    { stem: 'Which design principle reduces duplicate code in API automation?', options: ['Code Duplication', 'DRY (Dont Repeat Yourself)', 'Hardcoding', 'Manual Execution'], answer: 1, explanation: 'DRY improves maintainability and reduces repeated code.' },
    { stem: 'Which practice is recommended for enterprise API automation frameworks?', options: ['Hardcode credentials', 'Use layered architecture, reusable utilities, reporting, CI/CD integration and configuration files', 'Store endpoints inside every test', 'Disable logging'], answer: 1, explanation: 'Enterprise frameworks emphasize modularity, reusability, configuration management and CI/CD integration.' },
    { stem: 'What is API Chaining?', options: ['Running APIs in parallel', 'Using data from one API response in another API request', 'Executing APIs randomly', 'Calling multiple APIs simultaneously'], answer: 1, explanation: 'API Chaining uses data extracted from one response in subsequent API requests.' },
    { stem: 'Which response value is most commonly extracted for API Chaining?', options: ['Status Code', 'Response Time', 'Resource ID', 'Headers'], answer: 2, explanation: 'Resource IDs are commonly reused in update, retrieve and delete requests.' },
    { stem: 'Which CRUD operation is usually tested first during API Chaining?', options: ['DELETE', 'GET', 'POST', 'PATCH'], answer: 2, explanation: 'POST creates the resource that subsequent requests use.' },
    { stem: 'What is Contract Testing?', options: ['Testing database connections', 'Validating that an API follows its agreed request and response contract', 'Performance testing', 'UI testing'], answer: 1, explanation: 'Contract testing ensures APIs adhere to predefined specifications.' },
    { stem: 'Which document commonly defines an API contract?', options: ['OpenAPI (Swagger)', 'README', 'Jenkinsfile', 'Dockerfile'], answer: 0, explanation: 'OpenAPI (Swagger) documents API contracts, endpoints and schemas.' },
    { stem: 'Which tool is widely used to document REST APIs?', options: ['Swagger/OpenAPI', 'JMeter', 'Selenium', 'Git'], answer: 0, explanation: 'Swagger (OpenAPI) is the standard for REST API documentation.' },
    { stem: 'What is Mock API Testing?', options: ['Testing without authentication', 'Testing against simulated API responses', 'Testing only databases', 'Testing UI screens'], answer: 1, explanation: 'Mock APIs simulate backend responses before the actual service is available.' },
    { stem: 'Which HTTP status code commonly indicates rate limiting?', options: ['404', '429', '500', '302'], answer: 1, explanation: '429 Too Many Requests indicates the client exceeded the allowed request limit.' },
    { stem: 'Which HTTP status code indicates a service is temporarily unavailable?', options: ['401', '503', '404', '409'], answer: 1, explanation: '503 Service Unavailable indicates the server is temporarily unable to process requests.' },
    { stem: 'Which HTTP status code indicates a request conflict?', options: ['409', '403', '500', '422'], answer: 0, explanation: '409 Conflict occurs when the request conflicts with the current resource state.' },
    { stem: 'Which type of testing verifies API response time under expected load?', options: ['Smoke Testing', 'Performance Testing', 'Regression Testing', 'Compatibility Testing'], answer: 1, explanation: 'Performance testing measures response time, throughput and scalability.' },
    { stem: 'Which tool is commonly used for API performance testing?', options: ['JMeter', 'Postman', 'REST Assured', 'Mockito'], answer: 0, explanation: 'Apache JMeter is widely used for load and performance testing APIs.' },
    { stem: 'Which security risk occurs when sensitive information is transmitted without HTTPS?', options: ['SQL Injection', 'Man-in-the-Middle Attack', 'Cross-Site Scripting', 'Deadlock'], answer: 1, explanation: 'HTTPS encrypts communication and prevents interception.' },
    { stem: 'Which protocol should always be used for secure REST APIs?', options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'], answer: 1, explanation: 'HTTPS encrypts API communication using TLS/SSL.' },
    { stem: 'Which API security practice protects against unauthorized access?', options: ['Disable authentication', 'Use OAuth 2.0 or JWT', 'Store passwords in URLs', 'Use GET for login'], answer: 1, explanation: 'OAuth 2.0 and JWT provide secure authentication and authorization.' },
    { stem: 'Why should sensitive data never be passed as query parameters?', options: ['URLs may be logged and exposed', 'They execute slower', 'They cannot be encrypted', 'Browsers reject them'], answer: 0, explanation: 'URLs can appear in logs, browser history and server logs.' },
    { stem: 'What should be validated besides the status code during API testing?', options: ['Only response time', 'Headers, body, schema and response time', 'Database only', 'Only cookies'], answer: 1, explanation: 'Comprehensive validation includes response content, schema and performance.' },
    { stem: 'Which API testing practice improves test independence?', options: ['Reuse data from previous executions', 'Create and clean up test data during execution', 'Hardcode resource IDs', 'Execute tests in sequence only'], answer: 1, explanation: 'Independent tests are easier to maintain and execute.' },
    { stem: 'What is the purpose of negative API testing?', options: ['Verify only successful requests', 'Validate API behavior with invalid inputs', 'Improve UI design', 'Measure CPU usage'], answer: 1, explanation: 'Negative testing verifies proper error handling for invalid requests.' },
    { stem: 'Which HTTP status code is commonly expected during negative validation for invalid input?', options: ['200', '201', '400', '204'], answer: 2, explanation: '400 Bad Request is commonly returned for invalid request data.' },
    { stem: 'Which interview scenario best demonstrates API automation skills?', options: ['Validate only status codes', 'Create, retrieve, update and delete a resource using API Chaining', 'Run a single GET request', 'Print the response body'], answer: 1, explanation: 'A complete CRUD workflow demonstrates practical API automation knowledge.' },
    { stem: 'What is the benefit of maintaining reusable utility classes in an API framework?', options: ['Increase code duplication', 'Reduce maintenance effort', 'Increase response time', 'Disable reporting'], answer: 1, explanation: 'Utility classes centralize common functionality and improve maintainability.' },
    { stem: 'Which framework characteristic is most important for long-term enterprise projects?', options: ['Hardcoded endpoints', 'Scalability and maintainability', 'Single test class', 'No reporting'], answer: 1, explanation: 'Enterprise frameworks should be modular, scalable and easy to maintain.' },
    { stem: 'Which interview question is commonly asked about REST APIs?', options: ['Difference between PUT and PATCH', 'Difference between Java and Python', 'Difference between Chrome and Firefox', 'Difference between SQL and Excel'], answer: 0, explanation: 'Interviewers frequently ask about PUT vs PATCH because they test REST fundamentals.' },
    { stem: 'Which statement best describes a mature enterprise API automation framework?', options: ['Contains only API requests', 'Includes layered architecture, configuration management, reporting, logging, CI/CD integration, reusable utilities and comprehensive validations', 'Uses only Postman collections', 'Stores all logic in a single class'], answer: 1, explanation: 'Enterprise frameworks emphasize modular design, maintainability, scalability and automation pipeline integration.' }
],
 'playwright-automation': [
    {
      stem: 'What is Playwright mainly used for?',
      options: [
        'Static site hosting',
        'Cross-browser automation',
        'Database management',
        'API documentation'
      ],
      answer: 1,
      explanation: 'Playwright is used to automate Chromium, Firefox, and WebKit browsers.'
    },
    {
      stem: 'Which browsers are supported by Playwright?',
      options: [
        'Chrome only',
        'Firefox only',
        'Chromium, Firefox and WebKit',
        'Safari only'
      ],
      answer: 2,
      explanation: 'Playwright supports Chromium, Firefox and WebKit.'
    },
    {
      stem: 'Which command launches a browser?',
      options: [
        'browser.open()',
        'chromium.launch()',
        'page.launch()',
        'playwright.open()'
      ],
      answer: 1,
      explanation: 'chromium.launch() launches a Chromium browser.'
    },
    {
      stem: 'Which object represents a browser tab?',
      options: [
        'Browser',
        'Context',
        'Page',
        'Locator'
      ],
      answer: 2,
      explanation: 'A Page object represents a single browser tab.'
    },
    {
      stem: 'What is BrowserContext in Playwright?',
      options: [
        'Browser history',
        'Isolated browser session',
        'Configuration file',
        'Locator engine'
      ],
      answer: 1,
      explanation: 'BrowserContext provides an isolated browser session.'
    },
    {
      stem: 'Which method creates a new browser context?',
      options: [
        'browser.newPage()',
        'browser.newContext()',
        'page.context()',
        'context.create()'
      ],
      answer: 1,
      explanation: 'browser.newContext() creates an isolated browser context.'
    },
    {
      stem: 'Which method opens a new page?',
      options: [
        'browser.newPage()',
        'context.newPage()',
        'page.newTab()',
        'browser.createPage()'
      ],
      answer: 1,
      explanation: 'Pages are created from BrowserContext using newPage().'
    },
    {
      stem: 'Which method navigates to a URL?',
      options: [
        'page.navigate()',
        'page.goto()',
        'page.open()',
        'page.visit()'
      ],
      answer: 1,
      explanation: 'page.goto() loads the specified URL.'
    },
    {
      stem: 'Which locator is recommended by Playwright?',
      options: [
        'XPath',
        'CSS Class',
        'getByRole()',
        'Absolute XPath'
      ],
      answer: 2,
      explanation: 'getByRole() provides stable and accessible locators.'
    },
    {
      stem: 'Which locator finds elements using visible text?',
      options: [
        'getByLabel()',
        'getByPlaceholder()',
        'getByText()',
        'locator()'
      ],
      answer: 2,
      explanation: 'getByText() searches for visible text.'
    },
    {
      stem: 'Which locator is best for buttons?',
      options: [
        'getByRole()',
        'XPath',
        'CSS',
        'ID'
      ],
      answer: 0,
      explanation: 'Buttons should ideally be located using getByRole().'
    },
    {
      stem: 'Which Playwright feature automatically waits before actions?',
      options: [
        'Sleep',
        'Auto Waiting',
        'Implicit Wait',
        'Explicit Wait'
      ],
      answer: 1,
      explanation: 'Playwright automatically waits before interacting with elements.'
    },
    {
      stem: 'Which action enters text into an input?',
      options: [
        'page.type()',
        'locator.fill()',
        'locator.sendKeys()',
        'page.enter()'
      ],
      answer: 1,
      explanation: 'fill() clears existing text before entering new text.'
    },
    {
      stem: 'Which method clicks an element?',
      options: [
        'locator.press()',
        'locator.tap()',
        'locator.click()',
        'locator.select()'
      ],
      answer: 2,
      explanation: 'click() performs a mouse click.'
    },
    {
      stem: 'Which assertion verifies page title?',
      options: [
        'expect(page).toHaveTitle()',
        'expect(title).toBe()',
        'page.assertTitle()',
        'verifyTitle()'
      ],
      answer: 0,
      explanation: 'toHaveTitle() verifies the page title.'
    },
    {
      stem: 'Which assertion verifies URL?',
      options: [
        'expect(page).toHaveURL()',
        'expect(url).toContain()',
        'page.verifyURL()',
        'page.urlCheck()'
      ],
      answer: 0,
      explanation: 'toHaveURL() validates the current URL.'
    },
    {
      stem: 'Which locator finds elements using placeholder text?',
      options: [
        'getByText()',
        'getByPlaceholder()',
        'locator()',
        'getByAltText()'
      ],
      answer: 1,
      explanation: 'getByPlaceholder() identifies elements by placeholder attribute.'
    },
    {
      stem: 'Which locator identifies images?',
      options: [
        'getByRole()',
        'getByAltText()',
        'getByLabel()',
        'locator()'
      ],
      answer: 1,
      explanation: 'Images are commonly identified by alt text.'
    },
    {
      stem: 'Which locator finds input labels?',
      options: [
        'getByLabel()',
        'locator()',
        'getByText()',
        'getByPlaceholder()'
      ],
      answer: 0,
      explanation: 'getByLabel() identifies form fields using associated labels.'
    },
    {
      stem: 'Which locator uses custom attributes like data-testid?',
      options: [
        'getByRole()',
        'getByTestId()',
        'locator()',
        'getByText()'
      ],
      answer: 1,
      explanation: 'getByTestId() locates elements using data-testid.'
    },
    {
      stem: 'Which Playwright method captures a screenshot?',
      options: [
        'page.capture()',
        'page.screenshot()',
        'browser.snapshot()',
        'locator.image()'
      ],
      answer: 1,
      explanation: 'page.screenshot() captures the current page.'
    },
    {
      stem: 'Which method reloads the current page?',
      options: [
        'page.refresh()',
        'page.reload()',
        'page.restart()',
        'page.reset()'
      ],
      answer: 1,
      explanation: 'reload() refreshes the current page.'
    },
    {
      stem: 'Which method retrieves the current page URL?',
      options: [
        'page.currentURL()',
        'page.getURL()',
        'page.url()',
        'page.location()'
      ],
      answer: 2,
      explanation: 'page.url() returns the current URL.'
    },
    {
      stem: 'Which method waits for a specific URL?',
      options: [
        'page.waitForLoadState()',
        'page.waitForNavigation()',
        'page.waitForURL()',
        'page.goto()'
      ],
      answer: 2,
      explanation: 'waitForURL() waits until the page reaches the expected URL.'
    },
    {
      stem: 'Which programming languages are officially supported by Playwright?',
      options: [
        'JavaScript, TypeScript, Java, Python and .NET',
        'Only JavaScript',
        'Only Java',
        'Only Python'
      ],
      answer: 0,
      explanation: 'Playwright officially supports JavaScript, TypeScript, Java, Python and .NET.'
    },  {
      stem: 'Which method selects an option from a dropdown?',
      options: [
        'locator.choose()',
        'locator.selectOption()',
        'locator.select()',
        'locator.pick()'
      ],
      answer: 1,
      explanation: 'selectOption() is used to select values from HTML select elements.'
    },
    {
      stem: 'How do you check a checkbox in Playwright?',
      options: [
        'locator.click()',
        'locator.select()',
        'locator.check()',
        'locator.enable()'
      ],
      answer: 2,
      explanation: 'check() ensures the checkbox is checked.'
    },
    {
      stem: 'Which method unchecks a checkbox?',
      options: [
        'locator.uncheck()',
        'locator.clear()',
        'locator.remove()',
        'locator.reset()'
      ],
      answer: 0,
      explanation: 'uncheck() removes the check if the checkbox is checked.'
    },
    {
      stem: 'Which method simulates pressing a keyboard key?',
      options: [
        'locator.keyPress()',
        'locator.press()',
        'keyboard.send()',
        'page.typeKey()'
      ],
      answer: 1,
      explanation: 'press() simulates keyboard events like Enter, Tab, etc.'
    },
    {
      stem: 'Which object is used for advanced keyboard actions?',
      options: [
        'page.keyboard',
        'page.keys',
        'browser.keyboard',
        'locator.keyboard'
      ],
      answer: 0,
      explanation: 'page.keyboard provides methods for keyboard interactions.'
    },
    {
      stem: 'Which method performs a double-click?',
      options: [
        'locator.click(2)',
        'locator.doubleClick()',
        'locator.dblclick()',
        'locator.doubleTap()'
      ],
      answer: 2,
      explanation: 'dblclick() performs a double mouse click.'
    },
    {
      stem: 'Which method performs a right-click?',
      options: [
        'locator.rightClick()',
        'locator.click({ button: "right" })',
        'locator.contextClick()',
        'locator.mouseRight()'
      ],
      answer: 1,
      explanation: 'Passing button:"right" performs a context-click.'
    },
    {
      stem: 'Which object provides mouse operations?',
      options: [
        'page.pointer',
        'page.mouse',
        'browser.mouse',
        'locator.mouse'
      ],
      answer: 1,
      explanation: 'page.mouse supports move(), click(), down(), and up().'
    },
    {
      stem: 'Which method uploads a file?',
      options: [
        'locator.upload()',
        'locator.attachFile()',
        'locator.setInputFiles()',
        'locator.selectFile()'
      ],
      answer: 2,
      explanation: 'setInputFiles() uploads one or more files.'
    },
    {
      stem: 'Which event is used to handle file downloads?',
      options: [
        'download',
        'file',
        'page.download',
        'downloadStart'
      ],
      answer: 0,
      explanation: 'Playwright emits a download event when downloading files.'
    },
    {
      stem: 'Which method waits for a download event?',
      options: [
        'page.waitForDownload()',
        'page.waitForEvent("download")',
        'browser.download()',
        'locator.waitDownload()'
      ],
      answer: 1,
      explanation: 'waitForEvent("download") waits until a file download begins.'
    },
    {
      stem: 'Which method saves a downloaded file?',
      options: [
        'download.copy()',
        'download.saveAs()',
        'download.store()',
        'download.export()'
      ],
      answer: 1,
      explanation: 'saveAs() stores the downloaded file locally.'
    },
    {
      stem: 'Which Playwright method handles browser dialogs?',
      options: [
        'page.dialog()',
        'page.on("dialog")',
        'page.handleAlert()',
        'page.popup()'
      ],
      answer: 1,
      explanation: 'page.on("dialog") listens for alerts, prompts, and confirms.'
    },
    {
      stem: 'How do you accept a JavaScript alert?',
      options: [
        'dialog.ok()',
        'dialog.accept()',
        'dialog.confirm()',
        'dialog.close()'
      ],
      answer: 1,
      explanation: 'accept() confirms the dialog.'
    },
    {
      stem: 'How do you dismiss a confirmation dialog?',
      options: [
        'dialog.reject()',
        'dialog.cancel()',
        'dialog.dismiss()',
        'dialog.close()'
      ],
      answer: 2,
      explanation: 'dismiss() cancels the dialog.'
    },
    {
      stem: 'Which method accesses an iframe?',
      options: [
        'page.frameLocator()',
        'page.switchFrame()',
        'page.iframe()',
        'locator.frame()'
      ],
      answer: 0,
      explanation: 'frameLocator() provides easy interaction with iframe elements.'
    },
    {
      stem: 'Which method returns all frames on a page?',
      options: [
        'page.allFrames()',
        'page.frames()',
        'page.frameList()',
        'browser.frames()'
      ],
      answer: 1,
      explanation: 'frames() returns an array of all frames.'
    },
    {
      stem: 'Which method retrieves a frame by its name?',
      options: [
        'page.frame({ name: "frameName" })',
        'page.getFrame()',
        'page.frameByName()',
        'browser.frame()'
      ],
      answer: 0,
      explanation: 'page.frame() can locate a frame using its name.'
    },
    {
      stem: 'How do you wait for a popup window?',
      options: [
        'page.waitForPopup()',
        'page.waitForEvent("popup")',
        'browser.popup()',
        'page.popup()'
      ],
      answer: 1,
      explanation: 'waitForEvent("popup") waits until a new window opens.'
    },
    {
      stem: 'Which method brings a page to the front?',
      options: [
        'page.focus()',
        'page.activate()',
        'page.bringToFront()',
        'page.show()'
      ],
      answer: 2,
      explanation: 'bringToFront() activates the page in headed mode.'
    },
    {
      stem: 'Which assertion verifies an element is visible?',
      options: [
        'expect(locator).toBeVisible()',
        'expect(locator).visible()',
        'locator.isVisible()',
        'expect(locator).displayed()'
      ],
      answer: 0,
      explanation: 'toBeVisible() checks that the element is displayed.'
    },
    {
      stem: 'Which assertion verifies an element contains text?',
      options: [
        'expect(locator).toContainText()',
        'expect(locator).hasText()',
        'locator.contains()',
        'expect(locator).text()'
      ],
      answer: 0,
      explanation: 'toContainText() validates partial text.'
    },
    {
      stem: 'Which assertion verifies an input value?',
      options: [
        'expect(locator).toHaveValue()',
        'expect(locator).value()',
        'locator.getValue()',
        'expect(locator).containsValue()'
      ],
      answer: 0,
      explanation: 'toHaveValue() verifies the value of an input element.'
    },
    {
      stem: 'Which assertion checks if a checkbox is checked?',
      options: [
        'expect(locator).toBeSelected()',
        'expect(locator).toBeChecked()',
        'locator.checked()',
        'expect(locator).checked()'
      ],
      answer: 1,
      explanation: 'toBeChecked() validates the checked state.'
    },
    {
      stem: 'Which assertion verifies the number of matched elements?',
      options: [
        'expect(locator).toHaveCount()',
        'expect(locator).count()',
        'locator.total()',
        'expect(locator).length()'
      ],
      answer: 0,
      explanation: 'toHaveCount() verifies the number of matching elements.'
    }, {
      stem: 'Which Playwright feature allows API testing without launching a browser?',
      options: [
        'BrowserContext',
        'APIRequestContext',
        'Route',
        'Fixture'
      ],
      answer: 1,
      explanation: 'APIRequestContext enables direct API testing.'
    },
    {
      stem: 'Which method sends a GET request using Playwright?',
      options: [
        'request.fetch()',
        'request.get()',
        'request.open()',
        'request.send()'
      ],
      answer: 1,
      explanation: 'request.get() sends an HTTP GET request.'
    },
    {
      stem: 'Which method sends a POST request?',
      options: [
        'request.post()',
        'request.create()',
        'request.send()',
        'request.insert()'
      ],
      answer: 0,
      explanation: 'request.post() sends HTTP POST requests.'
    },
    {
      stem: 'Which method intercepts network requests?',
      options: [
        'page.intercept()',
        'page.route()',
        'page.network()',
        'browser.route()'
      ],
      answer: 1,
      explanation: 'page.route() intercepts matching network requests.'
    },
    {
      stem: 'Which method continues an intercepted request?',
      options: [
        'route.resume()',
        'route.continue()',
        'route.next()',
        'route.proceed()'
      ],
      answer: 1,
      explanation: 'route.continue() allows the request to continue.'
    },
    {
      stem: 'Which method aborts an intercepted request?',
      options: [
        'route.stop()',
        'route.cancel()',
        'route.abort()',
        'route.reject()'
      ],
      answer: 2,
      explanation: 'route.abort() blocks the network request.'
    },
    {
      stem: 'Which method fulfills an intercepted request with mock data?',
      options: [
        'route.reply()',
        'route.respond()',
        'route.fulfill()',
        'route.mock()'
      ],
      answer: 2,
      explanation: 'route.fulfill() returns a mocked response.'
    },
    {
      stem: 'Which Playwright feature helps mock backend APIs?',
      options: [
        'Fixtures',
        'Tracing',
        'Network Routing',
        'Projects'
      ],
      answer: 2,
      explanation: 'Network routing is used to mock API responses.'
    },
    {
      stem: 'What is the purpose of Fixtures in Playwright?',
      options: [
        'Generate reports',
        'Provide reusable setup and teardown',
        'Store screenshots',
        'Create locators'
      ],
      answer: 1,
      explanation: 'Fixtures provide reusable test setup.'
    },
    {
      stem: 'Which hook executes once before all tests?',
      options: [
        'beforeEach()',
        'beforeAll()',
        'beforeTest()',
        'beforeSuite()'
      ],
      answer: 1,
      explanation: 'beforeAll() runs once before all tests.'
    },
    {
      stem: 'Which hook runs before every test?',
      options: [
        'beforeEach()',
        'beforeAll()',
        'setup()',
        'initialize()'
      ],
      answer: 0,
      explanation: 'beforeEach() executes before every individual test.'
    },
    {
      stem: 'Which hook runs after every test?',
      options: [
        'afterEach()',
        'afterAll()',
        'cleanup()',
        'finish()'
      ],
      answer: 0,
      explanation: 'afterEach() performs cleanup after each test.'
    },
    {
      stem: 'Which hook executes once after all tests?',
      options: [
        'afterSuite()',
        'afterTest()',
        'afterAll()',
        'cleanupAll()'
      ],
      answer: 2,
      explanation: 'afterAll() executes after all tests finish.'
    },
    {
      stem: 'Which file stores Playwright configuration?',
      options: [
        'package.json',
        'playwright.config.ts',
        'config.js',
        'settings.json'
      ],
      answer: 1,
      explanation: 'playwright.config.ts is the standard configuration file.'
    },
    {
      stem: 'Which configuration property specifies the base URL?',
      options: [
        'url',
        'baseURL',
        'host',
        'rootURL'
      ],
      answer: 1,
      explanation: 'baseURL simplifies navigation commands.'
    },
    {
      stem: 'Which property enables retries for failed tests?',
      options: [
        'retryCount',
        'retry',
        'retries',
        'failedRetry'
      ],
      answer: 2,
      explanation: 'The retries property defines retry attempts.'
    },
    {
      stem: 'Which property controls test timeout?',
      options: [
        'executionTimeout',
        'testTimeout',
        'timeout',
        'maxTimeout'
      ],
      answer: 2,
      explanation: 'timeout sets the maximum execution time.'
    },
    {
      stem: 'Which property enables headless execution?',
      options: [
        'headless',
        'hidden',
        'background',
        'invisible'
      ],
      answer: 0,
      explanation: 'headless:true runs browsers without UI.'
    },
    {
      stem: 'Which property stores login information for reuse?',
      options: [
        'sessionStorage',
        'storageState',
        'cookies',
        'cacheState'
      ],
      answer: 1,
      explanation: 'storageState stores authentication state.'
    },
    {
      stem: 'Which method saves authentication state?',
      options: [
        'page.saveState()',
        'context.storageState()',
        'browser.saveSession()',
        'context.save()'
      ],
      answer: 1,
      explanation: 'storageState() exports cookies and local storage.'
    },
    {
      stem: 'Which configuration option runs tests in multiple browsers?',
      options: [
        'workers',
        'projects',
        'parallel',
        'engines'
      ],
      answer: 1,
      explanation: 'Projects allow execution across Chromium, Firefox, and WebKit.'
    },
    {
      stem: 'Which keyword groups related tests?',
      options: [
        'describe()',
        'group()',
        'suite()',
        'context()'
      ],
      answer: 0,
      explanation: 'describe() organizes related tests.'
    },
    {
      stem: 'Which keyword defines an individual test?',
      options: [
        'it()',
        'scenario()',
        'test()',
        'case()'
      ],
      answer: 2,
      explanation: 'test() defines a Playwright test case.'
    },
    {
      stem: 'Which annotation skips a test?',
      options: [
        'test.ignore()',
        'test.skip()',
        'test.disable()',
        'test.stop()'
      ],
      answer: 1,
      explanation: 'test.skip() marks a test as skipped.'
    },
    {
      stem: 'Which annotation executes only one test?',
      options: [
        'test.single()',
        'test.only()',
        'test.focus()',
        'test.run()'
      ],
      answer: 1,
      explanation: 'test.only() runs only the specified test.'
    },{
      stem: 'Which Playwright feature records execution for debugging?',
      options: [
        'Snapshots',
        'Tracing',
        'Logging',
        'Recording'
      ],
      answer: 1,
      explanation: 'Tracing captures screenshots, DOM snapshots, sources, and network activity.'
    },
    {
      stem: 'Which method starts tracing?',
      options: [
        'context.tracing.start()',
        'browser.startTracing()',
        'page.trace()',
        'context.startTrace()'
      ],
      answer: 0,
      explanation: 'Tracing begins using context.tracing.start().'
    },
    {
      stem: 'Which method stops tracing and saves the trace file?',
      options: [
        'context.tracing.stop()',
        'context.stopTracing()',
        'browser.stopTrace()',
        'page.traceStop()'
      ],
      answer: 0,
      explanation: 'context.tracing.stop() saves the trace archive.'
    },
    {
      stem: 'Which command opens a Playwright trace?',
      options: [
        'npx playwright open-trace trace.zip',
        'npx playwright trace',
        'playwright show trace.zip',
        'npm trace'
      ],
      answer: 0,
      explanation: 'open-trace opens the recorded execution in Trace Viewer.'
    },
    {
      stem: 'Which command runs Playwright tests?',
      options: [
        'npm run playwright',
        'npx playwright test',
        'playwright execute',
        'npm test-playwright'
      ],
      answer: 1,
      explanation: 'npx playwright test executes Playwright tests.'
    },
    {
      stem: 'Which command runs tests in headed mode?',
      options: [
        'npx playwright test --headed',
        'npx playwright headed',
        'npm headed',
        'playwright run headed'
      ],
      answer: 0,
      explanation: '--headed launches browsers with the UI visible.'
    },
    {
      stem: 'Which command runs tests in debug mode?',
      options: [
        'npx playwright test --debug',
        'npx playwright debug',
        'npm debug',
        'playwright inspect'
      ],
      answer: 0,
      explanation: '--debug launches Playwright Inspector.'
    },
    {
      stem: 'Which command generates HTML reports?',
      options: [
        'npx playwright show-report',
        'npm report',
        'playwright html',
        'npx playwright report'
      ],
      answer: 0,
      explanation: 'show-report opens the generated HTML report.'
    },
    {
      stem: 'Which configuration option controls the number of parallel workers?',
      options: [
        'parallel',
        'threads',
        'workers',
        'executors'
      ],
      answer: 2,
      explanation: 'workers defines the number of parallel processes.'
    },
    {
      stem: 'Which configuration option enables fully parallel execution?',
      options: [
        'parallelTests',
        'fullyParallel',
        'parallelExecution',
        'multiThread'
      ],
      answer: 1,
      explanation: 'fullyParallel allows all tests to execute concurrently.'
    },
    {
      stem: 'Which reporter generates HTML reports?',
      options: [
        'json',
        'list',
        'html',
        'line'
      ],
      answer: 2,
      explanation: 'The HTML reporter creates interactive execution reports.'
    },
    {
      stem: 'Which reporter is commonly used with Jenkins?',
      options: [
        'dot',
        'json',
        'junit',
        'line'
      ],
      answer: 2,
      explanation: 'JUnit reports integrate well with CI/CD tools.'
    },
    {
      stem: 'Which reporter generates Allure compatible results?',
      options: [
        'json',
        'allure-playwright',
        'line',
        'dot'
      ],
      answer: 1,
      explanation: 'allure-playwright produces Allure result files.'
    },
    {
      stem: 'Which configuration option records videos?',
      options: [
        'recordVideo',
        'video',
        'captureVideo',
        'saveVideo'
      ],
      answer: 1,
      explanation: 'video controls browser video recording.'
    },
    {
      stem: 'Which configuration option captures screenshots on failure?',
      options: [
        'screenshot',
        'capture',
        'screen',
        'image'
      ],
      answer: 0,
      explanation: 'screenshot: "only-on-failure" captures failed test screenshots.'
    },
    {
      stem: 'Which method waits until the network becomes idle?',
      options: [
        'page.waitForLoadState("networkidle")',
        'page.waitForIdle()',
        'page.networkIdle()',
        'page.waitNetwork()'
      ],
      answer: 0,
      explanation: 'networkidle waits until no network requests remain.'
    },
    {
      stem: 'Which locator strategy is considered the most stable?',
      options: [
        'Absolute XPath',
        'CSS nth-child',
        'getByTestId()',
        'Dynamic XPath'
      ],
      answer: 2,
      explanation: 'getByTestId() is less likely to break after UI changes.'
    },
    {
      stem: 'Why is hard-coded waitForTimeout() discouraged?',
      options: [
        'Consumes more memory',
        'Makes tests flaky and slower',
        'Deletes cookies',
        'Disables auto waiting'
      ],
      answer: 1,
      explanation: 'Static waits increase execution time and reduce reliability.'
    },
    {
      stem: 'Which Playwright feature automatically waits before performing actions?',
      options: [
        'Explicit Wait',
        'Implicit Wait',
        'Auto Waiting',
        'Polling'
      ],
      answer: 2,
      explanation: 'Auto Waiting is one of Playwright\'s biggest advantages.'
    },
    {
      stem: 'Which design pattern is recommended for Playwright automation frameworks?',
      options: [
        'MVC',
        'Singleton',
        'Page Object Model',
        'Factory'
      ],
      answer: 2,
      explanation: 'POM improves maintainability and reusability.'
    },
    {
      stem: 'Which Playwright feature supports execution across Chromium, Firefox and WebKit using the same test?',
      options: [
        'Fixtures',
        'Projects',
        'Workers',
        'Contexts'
      ],
      answer: 1,
      explanation: 'Projects enable cross-browser execution.'
    },
    {
      stem: 'Which object should be reused for multiple pages after login?',
      options: [
        'Browser',
        'BrowserContext',
        'Locator',
        'Frame'
      ],
      answer: 1,
      explanation: 'BrowserContext shares cookies and authentication.'
    },
    {
      stem: 'What is the main advantage of BrowserContext over launching multiple browsers?',
      options: [
        'Consumes more memory',
        'Provides isolated sessions with lower resource usage',
        'Runs slower',
        'Disables cookies'
      ],
      answer: 1,
      explanation: 'Contexts are lightweight isolated browser sessions.'
    },
    {
      stem: 'Which CI/CD platforms commonly execute Playwright tests?',
      options: [
        'Jenkins, GitHub Actions, GitLab CI, Azure DevOps',
        'WordPress',
        'Docker Hub only',
        'MongoDB Atlas'
      ],
      answer: 0,
      explanation: 'Playwright integrates with major CI/CD platforms.'
    },
    {
      stem: 'Which statement best describes Playwright?',
      options: [
        'A database testing tool',
        'A cross-browser end-to-end automation framework with built-in auto waiting',
        'A performance testing tool',
        'A load testing framework'
      ],
      answer: 1,
      explanation: 'Playwright is a modern end-to-end automation framework supporting multiple browsers with powerful built-in capabilities.'
    }
]
};
const JAVA_CODING_QUESTIONS = [
  { id: 'java-1', title: 'Print Hello TekArch', prompt: 'Write a Java program that prints "Hello TekArch" to the console.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    \n  }\n}' },
  { id: 'java-2', title: 'Add Two Numbers', prompt: 'Write a Java program that adds two integers and prints the result.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int a = 10;\n    int b = 20;\n    \n  }\n}' },
  { id: 'java-3', title: 'Even Or Odd', prompt: 'Write a Java program that checks whether a number is even or odd.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 17;\n    \n  }\n}' },
  { id: 'java-4', title: 'Largest Of Three', prompt: 'Write a Java program to find the largest among three numbers.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int a = 14;\n    int b = 9;\n    int c = 27;\n    \n  }\n}' },
  { id: 'java-5', title: 'Multiplication Table', prompt: 'Write a Java program that prints the multiplication table of 5.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 5;\n    \n  }\n}' },
  { id: 'java-6', title: 'Factorial', prompt: 'Write a Java program to calculate the factorial of a given number.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 5;\n    \n  }\n}' },
  { id: 'java-7', title: 'Reverse String', prompt: 'Write a Java program to reverse a string.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    String text = "automation";\n    \n  }\n}' },
  { id: 'java-8', title: 'Palindrome String', prompt: 'Write a Java program to check whether a string is a palindrome.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    String text = "level";\n    \n  }\n}' },
  { id: 'java-9', title: 'Count Vowels', prompt: 'Write a Java program that counts vowels in a string.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    String text = "Quality Assurance";\n    \n  }\n}' },
  { id: 'java-10', title: 'Array Sum', prompt: 'Write a Java program to calculate the sum of all elements in an array.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int[] numbers = {2, 4, 6, 8, 10};\n    \n  }\n}' },
  { id: 'java-11', title: 'Array Maximum', prompt: 'Write a Java program to find the maximum element in an array.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int[] numbers = {12, 3, 45, 7, 29};\n    \n  }\n}' },
  { id: 'java-12', title: 'Sort Array', prompt: 'Write a Java program to sort an integer array in ascending order.', starterCode: 'import java.util.Arrays;\n\npublic class Solution {\n  public static void main(String[] args) {\n    int[] numbers = {9, 1, 6, 3, 7};\n    \n  }\n}' },
  { id: 'java-13', title: 'Linear Search', prompt: 'Write a Java program to search for an element in an array using linear search.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int[] numbers = {4, 8, 15, 16, 23, 42};\n    int target = 15;\n    \n  }\n}' },
  { id: 'java-14', title: 'Fibonacci Series', prompt: 'Write a Java program to print the first 10 numbers of the Fibonacci series.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int count = 10;\n    \n  }\n}' },
  { id: 'java-15', title: 'Prime Number Check', prompt: 'Write a Java program to check whether a number is prime.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 29;\n    \n  }\n}' },
  { id: 'java-16', title: 'Count Digits', prompt: 'Write a Java program to count the digits in an integer.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 98452;\n    \n  }\n}' },
  { id: 'java-17', title: 'Swap Without Temp', prompt: 'Write a Java program to swap two numbers without using a temporary variable.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int a = 7;\n    int b = 12;\n    \n  }\n}' },
  { id: 'java-18', title: 'Second Largest', prompt: 'Write a Java program to find the second largest element in an array.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int[] numbers = {11, 5, 22, 9, 17};\n    \n  }\n}' },
  { id: 'java-19', title: 'Remove Spaces', prompt: 'Write a Java program to remove spaces from a string.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    String text = "Tek Arch Technology";\n    \n  }\n}' },
  { id: 'java-20', title: 'Character Frequency', prompt: 'Write a Java program to count how many times a character appears in a string.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    String text = "selenium";\n    char target = \'e\';\n    \n  }\n}' },
  { id: 'java-21', title: 'Reverse Number', prompt: 'Write a Java program to reverse an integer.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 12345;\n    \n  }\n}' },
  { id: 'java-22', title: 'Sum Of Digits', prompt: 'Write a Java program to find the sum of digits in an integer.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int number = 2468;\n    \n  }\n}' },
  { id: 'java-23', title: 'Word Count', prompt: 'Write a Java program to count the number of words in a sentence.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    String sentence = "Java coding helps QA automation engineers";\n    \n  }\n}' },
  { id: 'java-24', title: 'Duplicate Elements', prompt: 'Write a Java program to print duplicate elements in an integer array.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int[] numbers = {1, 3, 5, 3, 7, 1, 9};\n    \n  }\n}' },
  { id: 'java-25', title: 'Student Grade', prompt: 'Write a Java program that prints a grade based on a score using if-else conditions.', starterCode: 'public class Solution {\n  public static void main(String[] args) {\n    int score = 86;\n    \n  }\n}' }
];

const STORAGE_KEY = 'qa-challenge-browser-store-v1';
const SESSION_KEY = 'qa-challenge-browser-session-v1';

const state = {
  user: null,
  topics: [],
  view: 'auth',
  questions: [],
  currentIndex: 0,
  selectedAnswers: {},
  activeAttempt: null,
  countdown: null,
  intervalId: null,
  results: [],
  adminResults: null,
  resultReview: null,
  selectedCodingQuestionId: JAVA_CODING_QUESTIONS[0].id,
  codingDrafts: {},
  codingOutput: '',
  runtimeMode: 'browser'
};

let backend;

function renderBrand(markupClass = '') {
  const className = markupClass ? `brand ${markupClass}` : 'brand';
  return `
    <div class="${className}">
      <img src="/assets/tekarch-logo.png" alt="TekArch Technology" class="brand-logo" />
      <div>
        <div class="brand-name">TekArch Technology</div>
        <div class="brand-subtitle">QA Challenge Platform</div>
      </div>
    </div>
  `;
}

function render() {
  try {
    if (!state.user) {
      app.innerHTML = `
        <div class="container">
          <div class="nav">
            ${renderBrand('brand-compact')}
          </div>
          ${renderDeploymentNotice()}
          <section class="hero">
            ${renderBrand('brand-hero')}
            <h1>Login or register to start your assessment journey</h1>
            <p>Take 3-hour exams for Selenium, REST API testing, and Playwright. Admins get a consolidated overview, while candidates can review their own scores.</p>
            <div class="grid">
              <div class="card">
                <h3>100 questions per topic</h3>
                <p class="muted">Each assessment is crafted as multiple-choice questions with a 3-hour limit.</p>
              </div>
              <div class="card">
                <h3>${state.runtimeMode === 'server' ? 'Live Java compiler' : 'Browser-safe deployment'}</h3>
                <p class="muted">${state.runtimeMode === 'server'
                  ? 'Students can compile and run Java code directly from the dashboard.'
                  : 'Hosted builds keep accounts, tests, and results available in this browser without a server database.'}</p>
              </div>
            </div>
          </section>
          <div class="grid">
            <section class="panel">
              <h3>Login</h3>
              <form id="login-form" class="form-stack">
                <input name="username" placeholder="Username" required />
                <input name="password" placeholder="Password" type="password" required />
                <button type="submit">Login</button>
              </form>
            </section>
            <section class="panel">
              <h3>Register</h3>
              <form id="register-form" class="form-stack">
                <input name="username" placeholder="Username" required />
                <input name="preferredName" placeholder="Preferred name for certificate" />
                <input name="password" placeholder="Password" type="password" required />
                <button type="submit">Create account</button>
              </form>
            </section>
          </div>
        </div>
      `;
      bindAuthForms();
      return;
    }

    app.innerHTML = `
      <div class="container">
        <div class="nav">
          <div class="nav-title">
            ${renderBrand('brand-compact')}
            <div class="badge">${state.user.role === 'admin' ? 'Admin' : 'Candidate'}</div>
          </div>
          <div class="actions">
            <button class="secondary" data-action="dashboard">Dashboard</button>
            <button class="secondary" data-action="results">My Results</button>
            <button class="secondary" data-action="coding">Coding Lab</button>
            ${state.user.role === 'admin' ? '<button class="secondary" data-action="admin">Admin</button>' : ''}
            <button data-action="logout">Logout</button>
          </div>
        </div>

        ${state.view === 'dashboard' ? renderDashboard() : ''}
        ${state.view === 'results' ? renderResults() : ''}
        ${state.view === 'result-review' ? renderResultReview() : ''}
        ${state.view === 'admin' ? renderAdmin() : ''}
        ${state.view === 'coding' ? renderCoding() : ''}
        ${state.view === 'test' ? renderTest() : ''}
      </div>
    `;

    bindDashboardActions();
    bindResultActions();
    bindCodingActions();
    bindTestActions();
  } catch (error) {
    console.error('Render failed', error);
    app.innerHTML = `
      <div class="container">
        <section class="panel">
          <h3>Something went wrong</h3>
          <p class="muted">The app could not render correctly. Please refresh the page.</p>
          <pre>${error.message}</pre>
        </section>
      </div>
    `;
  }
}

function renderDeploymentNotice() {
  if (state.runtimeMode !== 'browser') {
    return '';
  }

  return `
    <section class="panel">
    </section>
  `;
}

function renderDashboard() {
  const username = state.user?.username || 'student';
  return `
    ${renderDeploymentNotice()}
    <section class="hero">
      <h1>Welcome back, ${username}</h1>
      <p>Choose a topic to begin your timed assessment. Each exam is 3 hours and includes 100 multiple-choice questions.</p>
    </section>
    ${state.topics.length ? `
      <div class="grid">
        ${state.topics.map((topic) => `
          <div class="card topic-card">
            <h3>${topic.title}</h3>
            <div class="meta">${topic.description}</div>
            <div class="badge">${topic.timeLimitMinutes / 60} hours</div>
            <button data-topic="${topic.slug}" data-action="start-test">Start Test</button>
          </div>
        `).join('')}
      </div>
    ` : `
      <section class="panel">
        <h3>Loading topics...</h3>
        <p class="muted">The assessment topics are being loaded. Please wait a moment and refresh if needed.</p>
      </section>
    `}
  `;
}

function renderTest() {
  const currentQuestion = state.questions[state.currentIndex];
  if (!currentQuestion) {
    return '<section class="panel"><h3>No questions loaded</h3></section>';
  }

  const currentSelection = state.selectedAnswers[currentQuestion.id];
  return `
    <section class="panel">
      <div class="nav">
        <div><h3>${currentQuestion.topic}</h3><div class="muted">Question ${state.currentIndex + 1} of ${state.questions.length}</div></div>
        <div class="badge">Time left: ${formatTime(state.countdown)}</div>
      </div>
      <div class="question-card">
        <h3>${currentQuestion.prompt}</h3>
        <div class="option-list">
          ${currentQuestion.options.map((option, index) => `
            <label>
              <input type="radio" name="answer" value="${index}" ${currentSelection === index ? 'checked' : ''} />
              ${option}
            </label>
          `).join('')}
        </div>
      </div>
      <div class="form-row" style="margin-top: 1rem;">
        <button class="secondary" data-action="prev-question">Previous</button>
        <button class="secondary" data-action="next-question">Next</button>
        <button data-action="submit-test">Submit Test</button>
      </div>
    </section>
  `;
}

function renderResults() {
  if (!state.results.length) {
    return `
      <section class="panel">
        <h3>Your Results</h3>
        <p class="muted">No tests have been completed yet.</p>
      </section>
    `;
  }

  return `
    <section class="panel">
      <h3>Your Results</h3>
      <table class="table">
        <thead>
          <tr><th>Topic</th><th>Correct</th><th>Wrong</th><th>Score</th><th>Status</th><th>Certificate</th><th>Submitted</th></tr>
        </thead>
        <tbody>
          ${state.results.map((attempt, index) => `
            <tr>
              <td><button class="secondary" data-action="open-result-review" data-attempt-index="${index}">${attempt.title}</button></td>
              <td>${attempt.correctAnswers}/${attempt.total}</td>
              <td>${attempt.wrongAnswers}</td>
              <td>${attempt.score}%</td>
              <td>${attempt.timeUp ? 'Time up' : 'Completed'}</td>
              <td>${attempt.eligibleForCertificate
                ? `<button class="secondary" data-action="download-certificate" data-attempt-index="${index}">Download</button>`
                : '<span class="muted">Available at 80%+</span>'}</td>
              <td>${new Date(attempt.submittedAt).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

function renderResultReview() {
  const attempt = state.resultReview;
  if (!attempt) {
    return `
      <section class="panel">
        <h3>Result review not available</h3>
        <p class="muted">Please return to My Results and open an attempt again.</p>
      </section>
    `;
  }

  const correctNumbers = attempt.review.correctNumbers.length ? attempt.review.correctNumbers.join(', ') : 'None';
  const wrongNumbers = attempt.review.wrongNumbers.length ? attempt.review.wrongNumbers.join(', ') : 'None';

  return `
    <section class="panel">
      <div class="nav">
        <div>
          <h3>${attempt.title} Review</h3>
          <div class="muted">Submitted ${new Date(attempt.submittedAt).toLocaleString()}</div>
        </div>
        <div class="actions">
          <button class="secondary" data-action="back-to-results">Back to Results</button>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>Correct Questions</h3>
          <p class="muted">${attempt.correctAnswers}/${attempt.total}</p>
          <p>${correctNumbers}</p>
        </div>
        <div class="card">
          <h3>Wrong Questions</h3>
          <p class="muted">${attempt.wrongAnswers}/${attempt.total}</p>
          <p>${wrongNumbers}</p>
        </div>
      </div>
    </section>
    <section class="panel">
      <h3>Question Breakdown</h3>
      <table class="table">
        <thead>
          <tr><th>No.</th><th>Status</th><th>Your Answer</th><th>Correct Answer</th><th>Question</th></tr>
        </thead>
        <tbody>
          ${attempt.review.items.map((item) => `
            <tr>
              <td>${item.number}</td>
              <td>${item.isCorrect ? 'Correct' : 'Wrong'}</td>
              <td>${item.selectedOption}</td>
              <td>${item.correctOption}</td>
              <td>${item.prompt}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

function renderAdmin() {
  if (!state.adminResults) {
    return '<section class="panel"><h3>Loading admin overview...</h3></section>';
  }

  return `
    <section class="panel">
      <h3>Consolidated Results</h3>
      <table class="table">
        <thead>
          <tr><th>Topic</th><th>Attempts</th><th>Average Score</th><th>Top Score</th></tr>
        </thead>
        <tbody>
          ${state.adminResults.summary.map((entry) => `
            <tr>
              <td>${entry.topic}</td>
              <td>${entry.attempts}</td>
              <td>${entry.averageScore}%</td>
              <td>${entry.topScore}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
    <section class="panel">
      <h3>Registered Users</h3>
      <table class="table">
        <thead>
          <tr><th>Username</th><th>Role</th><th>Created</th></tr>
        </thead>
        <tbody>
          ${state.adminResults.users.map((user) => `
            <tr>
              <td>${user.username}</td>
              <td>${user.role}</td>
              <td>${new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
    <section class="panel">
      <h3>All Candidate Attempts</h3>
      <table class="table">
        <thead>
          <tr><th>User</th><th>Topic</th><th>Correct</th><th>Wrong</th><th>Score</th><th>Certificate</th><th>Submitted</th></tr>
        </thead>
        <tbody>
          ${state.adminResults.attempts.length ? state.adminResults.attempts.map((attempt, index) => `
            <tr>
              <td>${attempt.username}</td>
              <td>${attempt.title}</td>
              <td>${attempt.correctAnswers}/${attempt.total}</td>
              <td>${attempt.wrongAnswers}</td>
              <td>${attempt.score}%</td>
              <td>${attempt.eligibleForCertificate
                ? `<button class="secondary" data-action="download-admin-certificate" data-attempt-index="${index}">Download</button>`
                : '<span class="muted">Not eligible</span>'}</td>
              <td>${new Date(attempt.submittedAt).toLocaleString()}</td>
            </tr>
          `).join('') : '<tr><td colspan="7">No submitted tests yet.</td></tr>'}
        </tbody>
      </table>
    </section>
  `;
}

function renderCoding() {
  const activeQuestion = getActiveCodingQuestion();
  const currentCode = getCodingDraft(activeQuestion.id);
  return `
    <section class="panel">
      <h3>Live Java Coding Lab</h3>
      <p class="muted">${state.runtimeMode === 'server'
        ? 'Paste a Java class and compile it instantly. The server will compile and run it for you.'
        : 'Static deployments keep assessments available, but Java compilation is disabled here. Run the local Node app to compile and execute Java code.'}</p>
      <div class="form-stack">
        <label for="coding-question-select">Choose one of the 25 Java questions</label>
        <select id="coding-question-select">
          ${JAVA_CODING_QUESTIONS.map((question) => `
            <option value="${question.id}" ${question.id === activeQuestion.id ? 'selected' : ''}>
              ${question.title}
            </option>
          `).join('')}
        </select>
      </div>
      <div class="question-card">
        <div class="badge">Question ${JAVA_CODING_QUESTIONS.findIndex((question) => question.id === activeQuestion.id) + 1} of ${JAVA_CODING_QUESTIONS.length}</div>
        <h3>${activeQuestion.title}</h3>
        <p class="muted">${activeQuestion.prompt}</p>
      </div>
      <textarea id="java-code" rows="18" spellcheck="false">${escapeHtml(currentCode)}</textarea>
      <div class="form-row" style="margin-top: 1rem;">
        <button id="compile-button">Compile & Run</button>
      </div>
      <h4>Output</h4>
      <pre>${state.codingOutput || 'No output yet.'}</pre>
    </section>
  `;
}

function bindAuthForms() {
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const response = await backend.login(data);
    if (response.error) {
      alert(response.error);
      return;
    }

    state.user = response;
    await loadDashboardData();
    state.view = 'dashboard';
    render();
  });

  document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const response = await backend.register(data);
    if (response.error) {
      alert(response.error);
      return;
    }

    state.user = response;
    await loadDashboardData();
    state.view = 'dashboard';
    render();
  });
}

function bindDashboardActions() {
  app.querySelectorAll('[data-action="start-test"]').forEach((button) => {
    button.addEventListener('click', async () => {
      const topicSlug = button.getAttribute('data-topic');
      const response = await backend.startTest(topicSlug);
      if (response.error) {
        alert(response.error);
        return;
      }

      state.questions = response.questions;
      state.activeAttempt = response.attempt;
      state.selectedAnswers = {};
      state.currentIndex = 0;
      state.countdown = response.attempt.timeLimitMs;
      state.view = 'test';
      startCountdown();
      render();
    });
  });

  app.querySelectorAll('[data-action]').forEach((button) => {
    const action = button.getAttribute('data-action');
    if (!action || action === 'start-test') {
      return;
    }

    button.addEventListener('click', async () => {
      if (action === 'dashboard') {
        state.view = 'dashboard';
        render();
      } else if (action === 'results') {
        await loadResults();
        state.resultReview = null;
        state.view = 'results';
        render();
      } else if (action === 'admin') {
        await loadAdminResults();
        state.view = 'admin';
        render();
      } else if (action === 'coding') {
        state.view = 'coding';
        render();
      } else if (action === 'logout') {
        await backend.logout();
        clearInterval(state.intervalId);
        state.user = null;
        state.view = 'auth';
        state.activeAttempt = null;
        state.questions = [];
        state.selectedAnswers = {};
        render();
      }
    });
  });
}

function bindTestActions() {
  const form = app.querySelector('.question-card');
  if (!form) {
    return;
  }

  app.querySelectorAll('input[name="answer"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const selectedIndex = Number(event.target.value);
      const currentQuestion = state.questions[state.currentIndex];
      state.selectedAnswers[currentQuestion.id] = selectedIndex;
    });
  });

  app.querySelector('[data-action="prev-question"]')?.addEventListener('click', () => {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
    render();
  });

  app.querySelector('[data-action="next-question"]')?.addEventListener('click', () => {
    state.currentIndex = Math.min(state.questions.length - 1, state.currentIndex + 1);
    render();
  });

  app.querySelector('[data-action="submit-test"]')?.addEventListener('click', async () => {
    const response = await backend.submitTest(state.activeAttempt.topic, state.selectedAnswers);
    if (response.error) {
      alert(response.error);
      return;
    }

    clearInterval(state.intervalId);
    state.activeAttempt = null;
    await loadResults();
    state.view = 'results';
    render();

    if (response.timeUp) {
      alert('Time is up. Your test has been submitted.');
    }
  });
}

function bindResultActions() {
  app.querySelectorAll('[data-action="open-result-review"]').forEach((button) => {
    button.addEventListener('click', () => {
      const attemptIndex = Number(button.getAttribute('data-attempt-index'));
      const attempt = state.results[attemptIndex];
      if (attempt) {
        state.resultReview = attempt;
        state.view = 'result-review';
        render();
      }
    });
  });

  app.querySelector('[data-action="back-to-results"]')?.addEventListener('click', () => {
    state.resultReview = null;
    state.view = 'results';
    render();
  });

  app.querySelectorAll('[data-action="download-certificate"]').forEach((button) => {
    button.addEventListener('click', () => {
      const attemptIndex = Number(button.getAttribute('data-attempt-index'));
      const attempt = state.results[attemptIndex];
      if (attempt) {
        downloadCertificate(attempt, getCertificateDisplayName(state.user.preferredName || state.user.username));
      }
    });
  });

  app.querySelectorAll('[data-action="download-admin-certificate"]').forEach((button) => {
    button.addEventListener('click', () => {
      const attemptIndex = Number(button.getAttribute('data-attempt-index'));
      const attempt = state.adminResults?.attempts?.[attemptIndex];
      if (attempt) {
        downloadCertificate(attempt, getCertificateDisplayName(attempt.preferredName || attempt.username));
      }
    });
  });
}

function bindCodingActions() {
  const select = document.getElementById('coding-question-select');
  select?.addEventListener('change', (event) => {
    state.selectedCodingQuestionId = event.target.value;
    state.codingOutput = '';
    render();
  });

  const editor = document.getElementById('java-code');
  editor?.addEventListener('input', (event) => {
    state.codingDrafts[state.selectedCodingQuestionId] = event.target.value;
  });

  const button = document.getElementById('compile-button');
  button?.addEventListener('click', async () => {
    const code = document.getElementById('java-code').value;
    state.codingDrafts[state.selectedCodingQuestionId] = code;
    const response = await backend.compile(code);
    state.codingOutput = response.output || response.error || 'No output.';
    render();
  });
}

function getActiveCodingQuestion() {
  return JAVA_CODING_QUESTIONS.find((question) => question.id === state.selectedCodingQuestionId) || JAVA_CODING_QUESTIONS[0];
}

function getCodingDraft(questionId) {
  const savedDraft = state.codingDrafts[questionId];
  if (typeof savedDraft === 'string') {
    return savedDraft;
  }

  const question = JAVA_CODING_QUESTIONS.find((entry) => entry.id === questionId) || JAVA_CODING_QUESTIONS[0];
  state.codingDrafts[question.id] = question.starterCode;
  return question.starterCode;
}

async function loadDashboardData() {
  state.topics = await backend.getTopics();
}

async function loadResults() {
  state.results = (await backend.getResults()).map(normalizeAttempt);
}

async function loadAdminResults() {
  const response = await backend.getAdminResults();
  state.adminResults = {
    summary: Array.isArray(response.summary) ? response.summary : [],
    users: Array.isArray(response.users) ? response.users : [],
    attempts: Array.isArray(response.attempts) ? response.attempts.map(normalizeAttempt) : []
  };
}

function startCountdown() {
  clearInterval(state.intervalId);
  state.intervalId = setInterval(() => {
    state.countdown = Math.max(0, state.countdown - 1000);
    if (state.countdown === 0) {
      clearInterval(state.intervalId);
      submitTestWhenTimeUp();
    }
    render();
  }, 1000);
}

async function submitTestWhenTimeUp() {
  const response = await backend.submitTest(state.activeAttempt.topic, state.selectedAnswers);
  state.activeAttempt = null;
  await loadResults();
  state.view = 'results';
  render();
  if (!response.error) {
    alert('Time is up. Your test has been submitted.');
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function normalizeAttempt(attempt) {
  const total = Number.isFinite(attempt.total) ? attempt.total : (Array.isArray(attempt.questions) ? attempt.questions.length : 0);
  const score = Number.isFinite(attempt.score) ? attempt.score : 0;
  const correctAnswers = Number.isFinite(attempt.correctAnswers)
    ? attempt.correctAnswers
    : Math.round((score / 100) * total);
  const wrongAnswers = Number.isFinite(attempt.wrongAnswers)
    ? attempt.wrongAnswers
    : Math.max(total - correctAnswers, 0);
  const review = buildAttemptReview(attempt);

  return {
    ...attempt,
    total,
    score,
    correctAnswers,
    wrongAnswers,
    review,
    eligibleForCertificate: typeof attempt.eligibleForCertificate === 'boolean'
      ? attempt.eligibleForCertificate
      : score >= 80
  };
}

function buildAttemptReview(attempt) {
  const questions = Array.isArray(attempt.questions) ? attempt.questions : [];
  const answers = attempt.answers && typeof attempt.answers === 'object' ? attempt.answers : {};
  const items = questions.map((question, index) => {
    const selectedIndex = Number.isInteger(answers[question.id]) ? answers[question.id] : null;
    const correctIndex = Number.isInteger(question.correctAnswer) ? question.correctAnswer : null;
    const selectedOption = selectedIndex === null ? 'Not answered' : (question.options?.[selectedIndex] || `Option ${selectedIndex + 1}`);
    const correctOption = correctIndex === null ? 'Not available' : (question.options?.[correctIndex] || `Option ${correctIndex + 1}`);
    return {
      number: index + 1,
      prompt: question.prompt || `Question ${index + 1}`,
      selectedOption,
      correctOption,
      isCorrect: selectedIndex !== null && selectedIndex === correctIndex
    };
  });

  return {
    items,
    correctNumbers: items.filter((item) => item.isCorrect).map((item) => item.number),
    wrongNumbers: items.filter((item) => !item.isCorrect).map((item) => item.number)
  };
}

function downloadCertificate(attempt, username) {
  if (!attempt.eligibleForCertificate) {
    alert('Certificates are available only for scores of 80% and above.');
    return;
  }

  const issuedOn = new Date(attempt.submittedAt || Date.now()).toLocaleDateString();
  const logoUrl = `${window.location.origin}/assets/tekarch-logo.png`;
  const certificateMarkup = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>QA Challenge Certificate</title>
    <style>
      body { font-family: 'Times New Roman', serif; background: #eef4fb; margin: 0; padding: 28px; color: #18324b; }
      .certificate { max-width: 980px; margin: 0 auto; background: #ffffff; border: 14px solid #1795e6; padding: 58px 64px; box-shadow: 0 22px 45px rgba(24, 50, 75, 0.14); position: relative; }
      .certificate::before { content: ''; position: absolute; inset: 16px; border: 2px solid #173c61; pointer-events: none; }
      .header { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 26px; }
      .logo { width: 220px; max-width: 100%; }
      .eyebrow { letter-spacing: 0.35rem; text-transform: uppercase; color: #1795e6; font-size: 12px; text-align: right; }
      h1 { font-size: 46px; margin: 12px 0 10px; color: #173c61; }
      h2 { font-size: 36px; margin: 18px 0; color: #1795e6; }
      p { font-size: 19px; line-height: 1.7; margin: 0; }
      .headline { text-align: center; margin: 24px 0; }
      .score { display: inline-block; margin-top: 28px; padding: 14px 22px; border: 2px solid #173c61; color: #173c61; font-weight: bold; background: #f2f9ff; }
      .footer { margin-top: 54px; display: flex; justify-content: space-between; gap: 24px; font-size: 16px; border-top: 1px solid #d6e6f5; padding-top: 18px; }
      .signature { margin-top: 44px; display: flex; justify-content: space-between; gap: 32px; }
      .sign-box { width: 45%; }
      .sign-line { border-top: 1px solid #173c61; margin-top: 44px; padding-top: 8px; font-size: 15px; color: #4a6279; }
    </style>
  </head>
  <body>
    <section class="certificate">
      <div class="header">
        <img src="${escapeHtml(logoUrl)}" alt="TekArch Technology logo" class="logo" />
        <div class="eyebrow">QA Challenge Platform</div>
      </div>
      <div class="headline">
        <h1>Certificate of Achievement</h1>
        <p>This certificate is proudly presented to</p>
        <h2>${escapeHtml(getCertificateDisplayName(username))}</h2>
        <p>for successfully completing the <strong>${escapeHtml(attempt.title)}</strong> assessment and demonstrating strong performance in the QA Challenge evaluation.</p>
        <div class="score">Score: ${attempt.score}% (${attempt.correctAnswers}/${attempt.total} correct)</div>
      </div>
      <div class="signature">
        <div class="sign-box">
          <div class="sign-line">Authorized by TekArch Technology</div>
        </div>
      </div>
      <div class="footer">
        <div>Issued on: ${escapeHtml(issuedOn)}</div>
        <div>Eligibility: 80% and above</div>
      </div>
    </section>
  </body>
</html>`;

  const blob = new Blob([certificateMarkup], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${username}-${attempt.topic}-certificate.html`.replace(/\s+/g, '-').toLowerCase();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getCertificateDisplayName(value) {
  return String(value || '').trim() || 'Student';
}

function isLocalHost() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

async function selectBackend() {
  try {
    const health = await serverApi('/api/health');
    if (health && !health.error && health.status === 'ok') {
      state.runtimeMode = 'server';
      return createServerBackend();
    }
  } catch (error) {
    console.warn('Falling back to browser mode because the API is unavailable.', error);
  }

  state.runtimeMode = 'browser';
  return createBrowserBackend();
}

function createServerBackend() {
  return {
    async getTopics() {
      const response = await serverApi('/api/topics');
      return Array.isArray(response) ? response : [];
    },
    login(data) {
      return serverApi('/api/auth/login', { method: 'POST', body: data });
    },
    register(data) {
      return serverApi('/api/auth/register', { method: 'POST', body: data });
    },
    me() {
      return serverApi('/api/me');
    },
    logout() {
      return serverApi('/api/auth/logout', { method: 'POST' });
    },
    startTest(topicSlug) {
      return serverApi(`/api/tests/${topicSlug}/start`, { method: 'POST' });
    },
    submitTest(topicSlug, answers) {
      return serverApi(`/api/tests/${topicSlug}/submit`, {
        method: 'POST',
        body: { answers }
      });
    },
    async getResults() {
      const response = await serverApi('/api/results');
      return Array.isArray(response) ? response : [];
    },
    getAdminResults() {
      return serverApi('/api/admin/results');
    },
    compile(code) {
      return serverApi('/api/compile', {
        method: 'POST',
        body: { code }
      });
    }
  };
}

function createBrowserBackend() {
  return {
    async getTopics() {
      return TOPICS;
    },
    async login({ username, password }) {
      if (!username || !password) {
        return { error: 'Username and password are required' };
      }

      const store = readBrowserStore();
      const user = store.users.find((entry) => entry.username.toLowerCase() === username.toLowerCase());
      if (!user || user.password !== password) {
        return { error: 'Invalid credentials' };
      }

      writeBrowserSession(user.id);
      return sanitizeBrowserUser(user);
    },
    async register({ username, password, preferredName }) {
      if (!username || !password) {
        return { error: 'Username and password are required' };
      }

      const store = readBrowserStore();
      if (store.users.some((entry) => entry.username.toLowerCase() === username.toLowerCase())) {
        return { error: 'That username is already taken' };
      }

      const user = {
        id: createId('user'),
        username,
        preferredName: preferredName?.trim() || username,
        password,
        role: 'student',
        createdAt: new Date().toISOString()
      };

      store.users.push(user);
      writeBrowserStore(store);
      writeBrowserSession(user.id);
      return sanitizeBrowserUser(user);
    },
    async me() {
      const user = getBrowserCurrentUser();
      return user ? sanitizeBrowserUser(user) : { error: 'Not logged in' };
    },
    async logout() {
      clearBrowserSession();
      return { ok: true };
    },
    async startTest(topicSlug) {
      const user = getBrowserCurrentUser();
      if (!user) {
        return { error: 'Authentication required' };
      }

      const topic = TOPICS.find((entry) => entry.slug === topicSlug);
      if (!topic) {
        return { error: 'Topic not found' };
      }

      const store = readBrowserStore();
      const attempt = {
        id: createId('attempt'),
        userId: user.id,
        topic: topic.slug,
        title: topic.title,
        startedAt: new Date().toISOString(),
        submittedAt: null,
        status: 'in-progress',
        questions: buildQuestionBank(topic.title, topic.slug).slice(0, 100),
        answers: {},
        score: 0,
        total: 100,
        timeLimitMs: topic.timeLimitMinutes * 60 * 1000
      };

      store.attempts.push(attempt);
      writeBrowserStore(store);

      return {
        attempt,
        questions: attempt.questions.map((question) => ({
          id: question.id,
          prompt: question.prompt,
          options: question.options,
          topic: question.topic
        }))
      };
    },
    async submitTest(topicSlug, answers) {
      const user = getBrowserCurrentUser();
      if (!user) {
        return { error: 'Authentication required' };
      }

      const store = readBrowserStore();
      const attempt = [...store.attempts].reverse().find((entry) => (
        entry.userId === user.id
        && entry.topic === topicSlug
        && entry.status === 'in-progress'
      ));

      if (!attempt) {
        return { error: 'No active test found' };
      }

      const questions = Array.isArray(attempt.questions) ? attempt.questions : [];
      const correctCount = questions.reduce((total, question) => {
        return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);

      const elapsedMs = Date.now() - new Date(attempt.startedAt).getTime();
      attempt.answers = answers;
      attempt.score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
      attempt.total = questions.length;
      attempt.correctAnswers = correctCount;
      attempt.wrongAnswers = Math.max(questions.length - correctCount, 0);
      attempt.submittedAt = new Date().toISOString();
      attempt.status = 'submitted';
      attempt.timeSpentMs = elapsedMs;
      attempt.timeUp = elapsedMs > attempt.timeLimitMs;

      writeBrowserStore(store);
      return { ok: true, result: normalizeAttempt(attempt), timeUp: attempt.timeUp };
    },
    async getResults() {
      const user = getBrowserCurrentUser();
      if (!user) {
        return [];
      }

      const store = readBrowserStore();
      return store.attempts
        .filter((entry) => entry.userId === user.id)
        .sort((left, right) => new Date(right.startedAt) - new Date(left.startedAt));
    },
    async getAdminResults() {
      const user = getBrowserCurrentUser();
      if (!user || user.role !== 'admin') {
        return { summary: [], users: [], attempts: [] };
      }

      const store = readBrowserStore();
      const submittedAttempts = store.attempts
        .filter((entry) => entry.status === 'submitted')
        .map((entry) => {
          const owner = store.users.find((candidate) => candidate.id === entry.userId);
          return {
            ...normalizeAttempt(entry),
            username: owner ? owner.username : 'Unknown user',
            preferredName: owner ? (owner.preferredName || owner.username) : 'Unknown user',
            role: owner ? owner.role : 'student'
          };
        });
      const summary = TOPICS.map((topic) => {
        const topicAttempts = submittedAttempts.filter((entry) => entry.topic === topic.slug);
        const averageScore = topicAttempts.length
          ? Math.round(topicAttempts.reduce((sum, entry) => sum + entry.score, 0) / topicAttempts.length)
          : 0;

        return {
          topic: topic.title,
          slug: topic.slug,
          attempts: topicAttempts.length,
          averageScore,
          topScore: topicAttempts.length ? Math.max(...topicAttempts.map((entry) => entry.score)) : 0
        };
      });

      return {
        summary,
        attempts: submittedAttempts,
        users: store.users.map(sanitizeBrowserUser)
      };
    },
    async compile() {
      return {
        ok: false,
        output: 'Java compilation is disabled in static deployment mode. Run the app locally with Node.js and Java installed to use Compile & Run.'
      };
    }
  };
}

async function serverApi(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    headers,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  };

  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const targetPath = isLocal
    ? normalizedPath
    : `/.netlify/functions/api${normalizedPath.replace(/^\/api/, '')}`;

  try {
    const response = await fetch(targetPath, config);
    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok && response.status >= 400) {
      return typeof payload === 'string' ? { error: payload } : payload;
    }

    return typeof payload === 'string' ? (payload ? JSON.parse(payload) : { ok: true }) : payload;
  } catch (error) {
    return { error: error.message || 'Unable to reach the API' };
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]];
  }
  return copy;
}

function buildQuestionBank(topicTitle, slug) {
  const templates = QUESTION_TEMPLATES[slug] || [];
  const questions = [];

  for (let index = 0; index < 100; index += 1) {
    const template = templates[index % templates.length];
    questions.push({
      id: `${slug}-${index + 1}`,
      topic: topicTitle,
      prompt: template.stem,
      options: template.options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`),
      correctAnswer: template.answer,
      explanation: template.explanation
    });
  }

  return questions;
}

function createDefaultBrowserStore() {
  return {
    users: [
      {
        id: 'admin-user',
        username: 'admin',
        preferredName: 'TekArch Admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString()
      }
    ],
    attempts: []
  };
}

function readBrowserStore() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initialStore = createDefaultBrowserStore();
      writeBrowserStore(initialStore);
      return initialStore;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.users) || !Array.isArray(parsed.attempts)) {
      throw new Error('Invalid browser store');
    }

    if (!parsed.users.some((user) => user.username === 'admin')) {
      parsed.users.unshift(createDefaultBrowserStore().users[0]);
      writeBrowserStore(parsed);
    }

    return parsed;
  } catch (error) {
    const fallbackStore = createDefaultBrowserStore();
    writeBrowserStore(fallbackStore);
    return fallbackStore;
  }
}

function writeBrowserStore(store) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function writeBrowserSession(userId) {
  window.localStorage.setItem(SESSION_KEY, userId);
}

function clearBrowserSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

function getBrowserCurrentUser() {
  const userId = window.localStorage.getItem(SESSION_KEY);
  if (!userId) {
    return null;
  }

  return readBrowserStore().users.find((user) => user.id === userId) || null;
}

function sanitizeBrowserUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

(async function init() {
  backend = await selectBackend();

  try {
    const userResponse = await backend.me();
    if (userResponse && !userResponse.error) {
      state.user = userResponse;
      await loadDashboardData();
      await loadResults();
      state.view = 'dashboard';
    }
  } catch (error) {
    console.error('Initial bootstrap failed', error);
    state.user = null;
  }

  if (!state.topics.length) {
    await loadDashboardData();
  }

  render();
})();
