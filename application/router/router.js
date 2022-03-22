const express = require('express');
const BaseRouter = require('./baseRouter.js');
const router = express.Router();

function Router({ phoneBook, users }) {

    router.get('/phoneBook/:userID', chooseContactsByUserID);
    router.get('/phoneBook', getContacts);
    router.get('/phoneBook/addNumber/:name/:number/:userID', addContact);
    router.get('/phoneBook/deleteNumber/:prop', deleteContact);
    router.get('/phoneBook/validate/:number', validate);
    router.get('/phoneBook/searchContact/:prop', searchContact);
    router.get('/phoneBook/sortContactsByName', sortContactsByName);
    router.get('/signIn/:login/:password', signIn);

    const baseRouter = new BaseRouter;

    function checkHandler() {
        res.json(baseRouter.error(404))
    }

    function chooseContactsByUserID (req, res) {
        let userID = req.params.userID;
        res.json(baseRouter.answer(phoneBook.chooseContactsByUserID(userID)));
    }

    function getContacts(req, res) {
        res.json(baseRouter.answer(phoneBook.getContacts()));
    }

    function addContact(req, res) {
        const { name, number, userID } = req.params;
        let convertedNumber = phoneBook.convertStrToNumber(number);
        if (convertedNumber && name && userID) {
            if (phoneBook.validateNumber(convertedNumber)) {
                res.json(baseRouter.answer(phoneBook.addNumber(name, convertedNumber, userID)));
            } else res.json(baseRouter.error(2));
        } else res.json(baseRouter.error(1));
    }

    function deleteContact(req, res) {
        let prop = req.params.prop;
        let convertedNumber = phoneBook.convertStrToNumber(prop);

        if (convertedNumber) {
            if (phoneBook.deleteNumber(convertedNumber, 'number')) {
                res.json(baseRouter.answer('Контакт удален'));
            }
        } else if (phoneBook.deleteNumber(prop, 'name')) {
            res.json(baseRouter.answer('Контакт удален'));
        } else res.json(baseRouter.error(3));
    }

    function validate(req, res) {
        let number = req.params.number;
        let convertedNumber = phoneBook.convertStrToNumber(number);
        if (convertedNumber) {
            if (phoneBook.validateNumber(convertedNumber)) {
                res.json(baseRouter.answer('valid'));
            } else res.json(baseRouter.error(2));
        } else res.json(baseRouter.error(1));
    }

    function searchContact(req, res) {
        let prop = req.params.prop;
        let convertedNumber = phoneBook.convertStrToNumber(prop);

        if (prop) {
            if (convertedNumber) {
                res.json(baseRouter.answer(phoneBook.searchContact(convertedNumber, 'number')));
            } else res.json(baseRouter.answer(phoneBook.searchContact(prop, 'name')));
        } else res.json(baseRouter.error(1));

    }

    function sortContactsByName(req, res) {
        res.json(baseRouter.answer(phoneBook.sortContactsByName()));
    }

    function signIn(req, res) {
        let login = req.params.login;
        let password = req.params.password;

        if (login && password) {
            res.json(baseRouter.answer(users.getUser(login, password)));
        } else res.json(baseRouter.error(1));

    }

    return router;
}

module.exports = Router;