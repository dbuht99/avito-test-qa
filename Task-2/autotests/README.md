# Инструкция


### Системные требования
- Node.js 18+ [ссылка на скачивание](https://nodejs.org/en/download)  
- Windows 10+, Windows Server 2016+ или подсистема Windows для Linux (WSL).
- MacOS 12 Monterey, MacOS 13 Ventura или MacOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 или Ubuntu 22.04 с архитектурой x86-64 или arm64.
- Установить браузер Chromium, поддерживаемый playwright:

```bash
npx playwright install --with-deps chromium
```

### Шаги

1. Установить зависимости 

```bash
npm install
```

2. Авторизоваться (необходима для получения индивидуальных данных по экологическому вкладу)

> Выполняется один раз перед запуском тест-кейсов

2.1 Скопировать файл `.env.example` в `.env`

```bash
cp .env.example .env
```

2.2 Заполнить данными существующего аккаунта Авито файл `.env`. В качестве логина используется почта или номер телефона в формате `79XXXXXXXXX`, ввод пароля обязательно в двойных кавычках. 
Пример:

```dotenv
AVITO_USER_NAME=79009990000
AVITO_PASSWORD="password#%"
```

2.3 Запустить скрипт авторизации в формате теста с флагом `--headed`, введя в терминал команду:

```bash
npx playwright test --headed tests/auth.setup.js 
```

2.4 В открывшемся окне браузера пройти Captcha в случае ее появления  

2.5 Ввести код из пуш-уведомления

3. Запустить тест-кейсы, введя в терминал команду

```bash
npx playwright test tests/ecoimpact.spec.js
```
### Результат
В случае успешного выполнения тест-кейсов, полученные скриншоты появятся в `../output`
