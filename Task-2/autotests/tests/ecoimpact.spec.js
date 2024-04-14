const { test, expect } = require('@playwright/test');

test('TESTCASE-1 Есть счетчик CO₂', async ({ page }) => {
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'CO₂' })
    .screenshot({ path: '../output/tc-1-CO2.png' });
  await expect(page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'CO₂' })).toBeVisible();
  // 
});

test('TESTCASE-2 Есть счетчик воды', async ({ page }) => {
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'воды' })
    .screenshot({ path: '../output/tc-2-water.png' });
  await expect(page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'воды' })).toBeVisible();
  // 
});


test('TESTCASE-3 Есть счетчик энергии', async ({ page }) => {
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'энергии' })
    .screenshot({ path: '../output/tc-3-energy.png' });
  await expect(page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'энергии' })).toBeVisible();
  // 
});

test('TESTCASE-4 Изменение единиц измерения с л на м3 при значении количества воды 1000 л', async ({ page }) => {
  const testValue = 1000;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": 5,
              "energy": 15,
              "materials": 1,
              "pineYears": 1,
              "water": testValue
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'воды' })
    .screenshot({ path: '../output/tc-4-water.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'л воды' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'м³ воды' })).toBeVisible();
  }
});

test('TESTCASE-5 Изменение единиц измерения CO₂ с кг на тонн при значении CO₂ 1000 кг', async ({ page }) => {
  const testValue = 1000;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": testValue,
              "energy": 15,
              "materials": 1,
              "pineYears": 1,
              "water": 1150
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });

  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'CO₂' })
    .screenshot({ path: '../output/tc-5-CO2.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'кг CO₂' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'тонн CO₂' })).toBeVisible();
  }
});

test('TESTCASE-6 Изменение единиц измерения энергии с кВт·ч на МВт·ч при значении энергии 1000 кВт·ч', async ({ page }) => {
  const testValue = 1000;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": 5,
              "energy": testValue,
              "materials": 1,
              "pineYears": 1,
              "water": 1150
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });

  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'энергии' })
    .screenshot({ path: '../output/tc-6-energy.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'кВт⋅ч энергии' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'МВт⋅ч энергии' })).toBeVisible();
  }
});


test('TESTCASE-7 Единицы измерения при значении количества воды 999 л', async ({ page }) => {
  const testValue = 999;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": 5,
              "energy": 15,
              "materials": 1,
              "pineYears": 1,
              "water": testValue
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'воды' })
    .screenshot({ path: '../output/tc-7-water.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'л воды' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'м³ воды' })).toBeVisible();
  }
});


test('TESTCASE-8 Изменение единиц измерения с л на м3 при значении количества воды 1001 л', async ({ page }) => {
  const testValue = 1001;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": 5,
              "energy": 15,
              "materials": 1,
              "pineYears": 1,
              "water": testValue
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'воды' })
    .screenshot({ path: '../output/tc-8-water.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'л воды' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'м³ воды' })).toBeVisible();
  }
});


test('TESTCASE-9 Единицы измерения CO₂ при значении количества CO₂ 999 кг ', async ({ page }) => {
  const testValue = 999;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": testValue,
              "energy": 15,
              "materials": 1,
              "pineYears": 1,
              "water": 1150
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });

  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'CO₂' })
    .screenshot({ path: '../output/tc-9-CO2.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'кг CO₂' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'тонн CO₂' })).toBeVisible();
  }
});



test('TESTCASE-10 Изменение единиц измерения CO₂ с кг на тонн при значении CO₂ 1001 кг', async ({ page }) => {
  const testValue = 1001;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": testValue,
              "energy": 15,
              "materials": 1,
              "pineYears": 1,
              "water": 1150
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });

  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'CO₂' })
    .screenshot({ path: '../output/tc-10-CO2.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'кг CO₂' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'тонн CO₂' })).toBeVisible();
  }
});

test('TESTCASE-11 Единицы измерения энергии при значении энергии 999 кВт·ч', async ({ page }) => {
  const testValue = 999;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": 5,
              "energy": testValue,
              "materials": 1,
              "pineYears": 1,
              "water": 1150
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });

  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'энергии' })
    .screenshot({ path: '../output/tc-11-energy.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'кВт⋅ч энергии' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'МВт⋅ч энергии' })).toBeVisible();
  }
});

test('TESTCASE-12 Изменение единиц измерения энергии с кВт·ч на МВт·ч при значении энергии 1001 кВт·ч', async ({ page }) => {
  const testValue = 1001;

  await page.route('*/**/charity/ecoImpact/init', async route => {
    const json = {
      "result": {
        "blocks": {
          "personalImpact": {
            "avatarUrl": "https://10.img.avito.st/image/1/1.5lbV17a2XL_jcMi5ldCaJEh0SrVr9Ew9Z3RI.lpi55LiANIocteqa1U_tc9wQuLsRQGAIHjTQs3OYKY8",
            "data": {
              "co2": 5,
              "energy": testValue,
              "materials": 1,
              "pineYears": 1,
              "water": 1150
            }
          }
        },
        "isAuthorized": true
      },
      "status": "ok"
    };
    await route.fulfill({ json });
  });

  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  await page.locator('.desktop-impact-item-eeQO3')
    .filter({ hasText: 'энергии' })
    .screenshot({ path: '../output/tc-12-energy.png' });

  if (testValue < 1000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'кВт⋅ч энергии' })).toBeVisible();
  }
  if (testValue >= 1000 && testValue < 1000000) {
    await expect(page.locator('.desktop-impact-item-eeQO3')
      .filter({ hasText: 'МВт⋅ч энергии' })).toBeVisible();
  }
});