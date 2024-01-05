# Cinzia SDK
Questa SDK permette di interagire con il server di Cinzia e quindi comunicare con la nostra AI.

## Indice
- [Installazione](#installazione)
- [Uso](#uso)
- [Test](#test)
- [Crea una nuova versione](#crea-una-nuova-versione)
- [Fai un rilascio](#fai-un-rilascio)
- [Contribuisci](#contribuisci)
- [License](#license)

## Installazione
```bash
npm install
```

## Uso
Impostare l'env del proprio progetto con l'indirizzo del server di Cinzia
```bash
CINZIA_SERVER_URL=http://localhost:8080
```
Per usare l'sdk vedi l'esempio in src/__tests__/index.test.js

## Test
Impostare l'env del proprio terminale con l'indirizzo del server di Cinzia. Per testare l'app è necessario avere una versione locale del server di Cinzia.
### Su Linux
```bash
export CINZIA_SERVER_URL=http://localhost:8080
```
### Su Window
```bash
set CINZIA_SERVER_URL=http://localhost:8080
```
Dopodiché lanciare il seguente comando:

```bash
npm test
```

## Crea una nuova versione
```bash
npm version major
```
oppure
```bash
npm version minor
```
oppure
```bash
npm version patch
```
Questo comando crea un nuovo tag e aggiorna il package.json con la nuova versione. Fa il push del tag sul repository remoto.

## Fai un rilascio
Su github, una volta che abbiamo creato la nuova versione, andiamo nella sezione "releases" a destra e clicchiamo su "Create a new release".
Inseriamo il tag creato e il titolo della release. Inseriamo una descrizione e clicchiamo su "Publish release".

## Contribuisci
TODO

## License
TODO
