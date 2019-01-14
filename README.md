# CountDown.js

### Como Instalar

Você pode instalar a biblioteca em seu projeto duas diferentes formas.

__1. CDN__

A função construtura __`CountDown`__ estará disponível no escopo global.

```html
// CSS
<head>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@danielpiva/countdown.js/dist/index.css">
</head>


// JavaScript
<script src="https://unpkg.com/@danielpiva/countdown.js/dist/index.js"></script>

```

__2. Webpack/Parcel__

##### Primeiro adicione à suas dependências
```bash
npm i @danielpiva/countdown.js --save

### ou

yarn add @danielpiva/countdown.js
```

##### Em seguida, importe em seu projeto
```javascript

import CountDown from '@danielpiva/count-down.js/dist';

import '@danielpiva/countdown.js/dist/index.css';

// ou

const CountDown = require('@danielpiva/count-down.js/dist').default;

require('@danielpiva/countdown.js/dist/index.css');

```

### Como Usar

Para instanciar um __`CountDown`__, passe uma refêrencia de um elemento `DOM` ou apenas um seletor, como no snippet abaixo.

É importante ressaltar que para a palavra `new` antes da chamada é obrigatória, caso contrário você irá obter um erro de runtime.

O count down será inicializado e renderizado somente após a chamada do método `start`;

É necessário que a data passada para o count down seja maior do que a data atual, nem que um milisegundo, caso contrário você irá obter um erro.

##### Básico

```html
<html lang="pt-BR">
    <head>
    </head>
    <body>
        <div id="meu-count-down"></div>
    </body>
</html>
```

```javascript

const meuCountDown = new CountDown('#meu-count-down', {
    until: new Date(2020, 1, 1)
});

meuCountDown.start();

```

##### Opções

```javascript

const countDown = new CountDown('#meu-count-down', {
    until: new Date(2020, 1, 1),
    // ou 
    date: new Date(2020, 1, 1),

    locale: {
        days: 'Dias',
        hours: 'Hours',
        minutes: 'Minutos',
        seconds: 'Seconds'
    }
});


// Você pode passar a data pelo método start também
countDown.start(new Date(2020, 1, 1));

```

##### Métodos

```javascript

const countDown = new CountDown('#meu-count-down', {
    until: new Date(2020)
});

countDown.start();

countDown.pause();

countDown.resume();

countDown.destroy();

```

##### Eventos

Lembre-se de registrar os handlers antes de chamar o método `start`, caso contrário você poderá perder os eventos.

```javascript

const countDown = new CountDown('#meu-count-down');

// Escutando a eventos
countDown.on('start', console.log);
countDown.on('pause', console.log);
countDown.on('resume', console.log);
countDown.on('render', console.log);
countDown.on('destroy', console.log);
countDown.on('end', console.log);

// Removendo handlers de eventos
countDown.off('start', console.log);
countDown.off('pause', console.log);
countDown.off('resume', console.log);
countDown.off('render', console.log);
countDown.off('destroy', console.log);
countDown.off('end', console.log);

countDown.start(new Date(2020, 1, 1));

```

### Métodos

| Nome        | Descrição                  | Parâmetros  | Retorno  |
|:------------- |:--------------|:------------- |:--------------------|
| start         | Inicializa o timer e dispara a primeira renderização. | `date`: `Date` |  -|
| pause         | Pausa o Count Down.      |   - |              - |
| resume        | Dá play no Count Down, caso esteja pausado.      |    - | -|
| on         | Registra `handler` passado para um evento. | `event`: `String`<br> `handler`: `Function` |  `handler`: `Function`|
| off         | Retira o `handler` de um evento, caso a referência passada seja encontrada na lista de handlers, caso contrário retira todos.       |   `event`: `String`<br> `handler`: `Function` |              - |
| destroy        | Destrói o Count Down. Retira todos os elementos criados do `DOM`.      |    - | - |
| forceUpdate        | Força um update e re-render no Count Down.      |    - | -|


### Eventos

| Nome        | Descrição                  | Argumentos  |
|:------------- |:--------------|:------------- |
| start         | Inicializa o timer e dispara a primeira renderização. | `date` |
| pause         | Pausa o Count Down.      |   - |              - |
| resume        | Dá play no Count Down, caso esteja pausado.      |    - |
| destroy        | Destrói o Count Down. Retira todos os elementos criados do `DOM`.      |    - |
| end        | Força um update e re-render no Count Down.      |    - |
