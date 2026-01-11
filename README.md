# GoGo TON — простой учебный контракт

![tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![node](https://img.shields.io/badge/node-%3E%3D14-blue.svg)

Краткий учебный пример смарт‑контракта для TON. Контракт сохраняет адрес последнего отправителя и предоставляет геттер для его чтения.

Документация по контракту: [docs/go_go_ton.md](docs/go_go_ton.md)

Технологии

- TON
- FunC
- Blueprint
- TypeScript

Как запустить / скомпилировать

```bash
npm install
npm run build
```

или напрямую через Blueprint:

```bash
npx blueprint build
```

Как тестировать

```bash
npm test
```

Развертывание

В проекте есть скрипты для развёртывания в папке `scripts/`. Пример запуска скрипта:

```bash
node scripts/deployGoGoTon.ts
```

Структура проекта

```
/contracts       # Исходники контрактов (.fc, .tolk)
/wrappers        # TypeScript-обёртки
/tests           # Тесты
/scripts         # Скрипты для развёртывания
```

Примеры использования

- Отправить внутреннее сообщение контракту — адрес отправителя сохранится.
- Вызвать геттер `get_the_latest_sender` — получить последний сохранённый адрес.

Планы по развитию

- Добавить более подробные примеры взаимодействия (JS/TS SDK).
- Добавить CI для автоматической компиляции и тестов.
- Добавить инструкции по деплою в mainnet/testnet.

License: MIT

# gogo-smart-ton

## Project structure

- `contracts` - source code of all the smart contracts of the project and their dependencies.
- `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
- `tests` - tests for the contracts.
- `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
