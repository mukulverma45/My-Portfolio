/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * UI Automation Tools Functionality
   */
  
  // URL Parser Tool
  const urlInput = document.getElementById('urlInput');
  const parseBtn = document.getElementById('parseBtn');
  const urlResults = document.getElementById('urlResults');
  
  if (parseBtn) {
    parseBtn.addEventListener('click', function() {
      const url = urlInput.value.trim();
      if (!url) {
        alert('Please enter a URL');
        return;
      }
      
      try {
        const urlObj = new URL(url);
        
        // Display parsed components
        document.getElementById('protocol').textContent = urlObj.protocol;
        document.getElementById('host').textContent = urlObj.hostname;
        document.getElementById('port').textContent = urlObj.port || 'default';
        document.getElementById('path').textContent = urlObj.pathname;
        document.getElementById('query').textContent = urlObj.search || 'none';
        
        // Validate URL for printer interface patterns
        let validation = 'Valid URL';
        if (urlObj.hostname.match(/^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[01])\./)) {
          validation += ' - Local network detected (typical for printer interfaces)';
        }
        if (urlObj.pathname.includes('printer') || urlObj.pathname.includes('status') || urlObj.pathname.includes('admin')) {
          validation += ' - Printer-related path detected';
        }
        
        document.getElementById('validation').textContent = validation;
        urlResults.style.display = 'block';
        
      } catch (e) {
        document.getElementById('validation').textContent = 'Invalid URL format';
        urlResults.style.display = 'block';
      }
    });
  }
  
  // Printer Test Automation
  const runTestBtn = document.getElementById('runTestBtn');
  const testResults = document.getElementById('testResults');
  const testLog = document.getElementById('testLog');
  const testStatus = document.getElementById('testStatus');
  
  if (runTestBtn) {
    runTestBtn.addEventListener('click', function() {
      const printerType = document.getElementById('printerType').value;
      const testType = document.getElementById('testType').value;
      
      testResults.style.display = 'block';
      testLog.innerHTML = '';
      testStatus.textContent = 'Running...';
      testStatus.style.color = '#ffc107';
      
      // Simulate test execution
      const steps = getTestSteps(printerType, testType);
      let stepIndex = 0;
      
      function executeStep() {
        if (stepIndex < steps.length) {
          testLog.innerHTML += steps[stepIndex] + '<br>';
          testLog.scrollTop = testLog.scrollHeight;
          stepIndex++;
          setTimeout(executeStep, 800);
        } else {
          testStatus.textContent = 'PASSED';
          testStatus.style.color = '#28a745';
          testLog.innerHTML += '<br>✅ Test completed successfully<br>';
        }
      }
      
      executeStep();
    });
  }
  
  function getTestSteps(printerType, testType) {
    const brand = printerType.charAt(0).toUpperCase() + printerType.slice(1);
    const steps = [
      `🔄 Initializing ${brand} ${testType} test...`,
      `🌐 Connecting to printer web interface...`,
      `🔐 Authenticating with test credentials...`,
    ];
    
    switch (testType) {
      case 'authentication':
        steps.push(
          `🔑 Testing login form submission...`,
          `✨ Validating session management...`,
          `🔒 Checking logout functionality...`
        );
        break;
      case 'status':
        steps.push(
          `📊 Retrieving printer status page...`,
          `🔍 Validating status indicators...`,
          `📈 Checking ink/toner levels...`,
          `📄 Verifying paper tray status...`
        );
        break;
      case 'compatibility':
        steps.push(
          `⚙️ Testing Pharos integration...`,
          `🔧 Validating API endpoints...`,
          `📋 Checking compliance requirements...`,
          `✅ Confirming ${brand} certification criteria...`
        );
        break;
      case 'security':
        steps.push(
          `🛡️ Testing SSL/TLS configuration...`,
          `🔐 Validating authentication mechanisms...`,
          `🚫 Checking for security vulnerabilities...`,
          `📝 Generating security report...`
        );
        break;
    }
    
    steps.push(`📄 Generating test report...`);
    return steps;
  }
  
  // Selenium Code Generator
  const generateCodeBtn = document.getElementById('generateCodeBtn');
  const generatedCode = document.getElementById('generatedCode');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  
  if (generateCodeBtn) {
    generateCodeBtn.addEventListener('click', function() {
      const actionType = document.getElementById('actionType').value;
      const selector = document.getElementById('elementSelector').value;
      
      if (!selector) {
        alert('Please enter an element selector');
        return;
      }
      
      const code = generateSeleniumCode(actionType, selector);
      generatedCode.value = code;
    });
  }
  
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', function() {
      generatedCode.select();
      document.execCommand('copy');
      copyCodeBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyCodeBtn.textContent = 'Copy Code';
      }, 2000);
    });
  }
  
  function generateSeleniumCode(actionType, selector) {
    let selectorType = 'Id';
    let selectorValue = selector;
    
    if (selector.startsWith('//')) {
      selectorType = 'XPath';
    } else if (selector.includes('.')) {
      selectorType = 'ClassName';
      selectorValue = selector.replace('.', '');
    } else if (selector.includes('#')) {
      selectorType = 'Id';
      selectorValue = selector.replace('#', '');
    } else if (selector.includes('[')) {
      selectorType = 'CssSelector';
    }
    
    let code = `// Generated Selenium C# code for ${actionType}\n`;
    code += `using OpenQA.Selenium;\n`;
    code += `using OpenQA.Selenium.Chrome;\n`;
    code += `using OpenQA.Selenium.Support.UI;\n\n`;
    code += `public class PrinterAutomationTest\n{\n`;
    code += `    private IWebDriver driver;\n`;
    code += `    private WebDriverWait wait;\n\n`;
    code += `    public void Setup()\n    {\n`;
    code += `        driver = new ChromeDriver();\n`;
    code += `        wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));\n`;
    code += `        driver.Navigate().GoToUrl("http://printer-ip-address");\n    }\n\n`;
    
    switch (actionType) {
      case 'login':
        code += `    public void PerformLogin()\n    {\n`;
        code += `        var element = wait.Until(ExpectedConditions.ElementToBeClickable(By.${selectorType}("${selectorValue}")));\n`;
        code += `        element.SendKeys("admin");\n`;
        code += `        \n`;
        code += `        var passwordField = driver.FindElement(By.Id("password"));\n`;
        code += `        passwordField.SendKeys("password");\n`;
        code += `        \n`;
        code += `        var loginButton = driver.FindElement(By.XPath("//input[@type='submit']"));\n`;
        code += `        loginButton.Click();\n`;
        code += `        \n`;
        code += `        // Verify successful login\n`;
        code += `        wait.Until(ExpectedConditions.UrlContains("dashboard"));\n    }\n`;
        break;
      case 'navigation':
        code += `    public void NavigateToPage()\n    {\n`;
        code += `        var element = wait.Until(ExpectedConditions.ElementToBeClickable(By.${selectorType}("${selectorValue}")));\n`;
        code += `        element.Click();\n`;
        code += `        \n`;
        code += `        // Wait for page to load\n`;
        code += `        wait.Until(ExpectedConditions.ElementExists(By.TagName("body")));\n    }\n`;
        break;
      case 'status_check':
        code += `    public bool VerifyPrinterStatus()\n    {\n`;
        code += `        var statusElement = wait.Until(ExpectedConditions.ElementExists(By.${selectorType}("${selectorValue}")));\n`;
        code += `        string statusText = statusElement.Text;\n`;
        code += `        \n`;
        code += `        // Check for common status indicators\n`;
        code += `        return statusText.Contains("Ready") || \n`;
        code += `               statusText.Contains("Online") || \n`;
        code += `               statusText.Contains("Idle");\n    }\n`;
        break;
      case 'form_fill':
        code += `    public void FillForm()\n    {\n`;
        code += `        var element = wait.Until(ExpectedConditions.ElementToBeClickable(By.${selectorType}("${selectorValue}")));\n`;
        code += `        element.Clear();\n`;
        code += `        element.SendKeys("test_value");\n`;
        code += `        \n`;
        code += `        // Submit form\n`;
        code += `        var submitButton = driver.FindElement(By.XPath("//input[@type='submit']"));\n`;
        code += `        submitButton.Click();\n    }\n`;
        break;
    }
    
    code += `\n    public void TearDown()\n    {\n`;
    code += `        driver?.Quit();\n    }\n`;
    code += `}`;
    
    return code;
  }

})()