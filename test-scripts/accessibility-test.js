// Accessibility testing script for PAPSNET homepage
const puppeteer = require('puppeteer');

async function runAccessibilityTest() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('♿ Starting accessibility test for PAPSNET homepage...');

  try {
    await page.goto('http://localhost:3001', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Test 1: Check for required meta tags
    const metaTags = await page.evaluate(() => {
      const lang = document.documentElement.lang;
      const viewport = document.querySelector('meta[name="viewport"]');
      const description = document.querySelector('meta[name="description"]');
      const title = document.title;

      return {
        lang: lang || 'Missing',
        viewport: viewport ? viewport.content : 'Missing',
        description: description ? description.content : 'Missing',
        title: title || 'Missing'
      };
    });

    console.log('🏷️ Meta Tags Check:');
    console.log(`  Language: ${metaTags.lang === 'Missing' ? '❌' : '✅'} ${metaTags.lang}`);
    console.log(`  Viewport: ${metaTags.viewport === 'Missing' ? '❌' : '✅'} Present`);
    console.log(`  Description: ${metaTags.description === 'Missing' ? '❌' : '✅'} Present`);
    console.log(`  Title: ${metaTags.title === 'Missing' ? '❌' : '✅'} "${metaTags.title}"`);

    // Test 2: Check for image alt texts
    const imageAccessibility = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim() === '');

      return {
        totalImages: images.length,
        imagesWithoutAlt: imagesWithoutAlt.length,
        missingAltImages: imagesWithoutAlt.map(img => img.src)
      };
    });

    console.log('\n🖼️ Image Accessibility:');
    console.log(`  Total Images: ${imageAccessibility.totalImages}`);
    console.log(`  Missing Alt Text: ${imageAccessibility.imagesWithoutAlt === 0 ? '✅' : '❌'} ${imageAccessibility.imagesWithoutAlt} images`);
    if (imageAccessibility.imagesWithoutAlt > 0) {
      console.log('  Images without alt text:', imageAccessibility.missingAltImages);
    }

    // Test 3: Check for heading structure
    const headingStructure = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const structure = headings.map(h => ({
        level: parseInt(h.tagName.charAt(1)),
        text: h.textContent.trim().substring(0, 50)
      }));

      const h1Count = headings.filter(h => h.tagName === 'H1').length;

      return {
        headings: structure,
        h1Count,
        hasLogicalOrder: checkHeadingOrder(structure)
      };

      function checkHeadingOrder(headings) {
        for (let i = 1; i < headings.length; i++) {
          const current = headings[i].level;
          const previous = headings[i - 1].level;
          if (current > previous + 1) {
            return false;
          }
        }
        return true;
      }
    });

    console.log('\n📑 Heading Structure:');
    console.log(`  H1 Count: ${headingStructure.h1Count === 1 ? '✅' : '❌'} ${headingStructure.h1Count} (should be 1)`);
    console.log(`  Logical Order: ${headingStructure.hasLogicalOrder ? '✅' : '❌'}`);
    console.log('  Heading Outline:');
    headingStructure.headings.forEach(h => {
      console.log(`    ${'  '.repeat(h.level - 1)}H${h.level}: ${h.text}`);
    });

    // Test 4: Check for keyboard navigation support
    const keyboardSupport = await page.evaluate(() => {
      const interactiveElements = Array.from(document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));

      const elementsWithoutTabindex = interactiveElements.filter(el => {
        const tabindex = el.getAttribute('tabindex');
        return tabindex === null || (tabindex !== '-1' && parseInt(tabindex) >= 0);
      });

      const skipLink = document.querySelector('a[href="#main-content"]');

      return {
        totalInteractive: interactiveElements.length,
        keyboardAccessible: elementsWithoutTabindex.length,
        hasSkipLink: !!skipLink
      };
    });

    console.log('\n⌨️ Keyboard Navigation:');
    console.log(`  Interactive Elements: ${keyboardSupport.totalInteractive}`);
    console.log(`  Keyboard Accessible: ${keyboardSupport.keyboardAccessible}`);
    console.log(`  Skip Link: ${keyboardSupport.hasSkipLink ? '✅' : '❌'} ${keyboardSupport.hasSkipLink ? 'Present' : 'Missing'}`);

    // Test 5: Check for ARIA labels and roles
    const ariaSupport = await page.evaluate(() => {
      const navigation = document.querySelector('nav[role="navigation"]') || document.querySelector('nav');
      const buttons = Array.from(document.querySelectorAll('button'));
      const buttonsWithLabels = buttons.filter(btn =>
        btn.getAttribute('aria-label') ||
        btn.getAttribute('aria-labelledby') ||
        btn.textContent.trim()
      );

      const landmarks = Array.from(document.querySelectorAll('main, nav, header, footer, aside, section[aria-label]'));

      return {
        hasNavigationRole: !!navigation,
        buttonLabels: {
          total: buttons.length,
          withLabels: buttonsWithLabels.length
        },
        landmarks: landmarks.length
      };
    });

    console.log('\n🎯 ARIA Support:');
    console.log(`  Navigation Role: ${ariaSupport.hasNavigationRole ? '✅' : '❌'}`);
    console.log(`  Button Labels: ${ariaSupport.buttonLabels.withLabels}/${ariaSupport.buttonLabels.total} ${ariaSupport.buttonLabels.withLabels === ariaSupport.buttonLabels.total ? '✅' : '❌'}`);
    console.log(`  Landmarks: ${ariaSupport.landmarks} ${ariaSupport.landmarks >= 3 ? '✅' : '❌'}`);

    // Test 6: Color contrast simulation (basic check)
    const colorContrast = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;

      // Basic contrast check (simplified)
      const hasHighContrast = backgroundColor.includes('rgb(0, 0, 0)') && color.includes('rgb(255, 255, 255)');

      return {
        backgroundColor,
        textColor: color,
        hasHighContrast
      };
    });

    console.log('\n🎨 Color Contrast:');
    console.log(`  Background: ${colorContrast.backgroundColor}`);
    console.log(`  Text Color: ${colorContrast.textColor}`);
    console.log(`  High Contrast: ${colorContrast.hasHighContrast ? '✅' : '⚠️'} ${colorContrast.hasHighContrast ? 'Good' : 'Needs Review'}`);

    // Test 7: Form accessibility (if forms exist)
    const formAccessibility = await page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'));
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const labels = Array.from(document.querySelectorAll('label'));

      const inputsWithLabels = inputs.filter(input => {
        const id = input.id;
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');

        return label || ariaLabel || ariaLabelledby;
      });

      return {
        formsCount: forms.length,
        inputsTotal: inputs.length,
        inputsWithLabels: inputsWithLabels.length,
        labelsCount: labels.length
      };
    });

    console.log('\n📝 Form Accessibility:');
    console.log(`  Forms Found: ${formAccessibility.formsCount}`);
    if (formAccessibility.inputsTotal > 0) {
      console.log(`  Input Labels: ${formAccessibility.inputsWithLabels}/${formAccessibility.inputsTotal} ${formAccessibility.inputsWithLabels === formAccessibility.inputsTotal ? '✅' : '❌'}`);
    } else {
      console.log('  No form inputs found');
    }

    // Calculate overall accessibility score
    const scores = {
      metaTags: (metaTags.lang !== 'Missing') + (metaTags.viewport !== 'Missing') + (metaTags.description !== 'Missing') + (metaTags.title !== 'Missing'),
      images: imageAccessibility.imagesWithoutAlt === 0 ? 1 : 0,
      headings: (headingStructure.h1Count === 1 ? 1 : 0) + (headingStructure.hasLogicalOrder ? 1 : 0),
      keyboard: keyboardSupport.hasSkipLink ? 1 : 0,
      aria: (ariaSupport.hasNavigationRole ? 1 : 0) + (ariaSupport.buttonLabels.withLabels === ariaSupport.buttonLabels.total ? 1 : 0),
      forms: formAccessibility.inputsTotal === 0 ? 1 : (formAccessibility.inputsWithLabels === formAccessibility.inputsTotal ? 1 : 0)
    };

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxScore = 10; // Maximum possible score
    const percentage = Math.round((totalScore / maxScore) * 100);

    console.log('\n📊 Accessibility Score:');
    console.log(`  Overall Score: ${percentage}% (${totalScore}/${maxScore})`);
    console.log(`  Status: ${percentage >= 90 ? '✅ Excellent' : percentage >= 70 ? '⚠️ Good' : percentage >= 50 ? '🔶 Fair' : '❌ Poor'}`);

    return {
      score: percentage,
      details: {
        metaTags,
        imageAccessibility,
        headingStructure,
        keyboardSupport,
        ariaSupport,
        colorContrast,
        formAccessibility
      }
    };

  } catch (error) {
    console.error('❌ Accessibility test failed:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

// Export for use in other scripts
if (require.main === module) {
  runAccessibilityTest().then(results => {
    process.exit(results ? 0 : 1);
  });
}

module.exports = { runAccessibilityTest };