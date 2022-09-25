## Starting the app:

In the SERVER directory, you can run:

### `npm install`
### `npm start`

Runs the server on port 3001.

Then in the WEBAPP directory, you can run:

### `npm install`
### `npm start`
Open http://localhost:3000 to view it in your browser.


## Task description

Užduotis -> Sukurti laiko rezervavimo sprendimą pas gydytoją.

Reikalavimai:

Laikui rezervuoti reikia nurodyti:

* Apsilankymo datą ir laiką;
* Paciento vardą ir pavardę.

Atliekant rezervaciją reikia patikrinti:

* Negali būti kelių rezervacijų tuo pačiu metu;
* Tas pats asmuo gali registruotis tik kartą per savaitę;
* Pageidautina, kad rezervacijos būtų atvaizduojamos kaip kalendorius.

Realizacijai reikia sukurti:
* JavaScript aplikaciją veikiančią NodeJS serverio pagrindu;
* Duomenys turi būti saugomi duomenų bazėje (galite rinktis bet kokią);
* Duomenų įvedimo/peržiūros formas, kurios naudotų JavaScript technologijas  (pageidautina SAPUI5, bet galima ir jums labiau priimtinomis);
* Projektą patalpinti išeities kodų saugojimo platformoje (pvz.; GitHub...)