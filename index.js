const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-4411d864-2f01-4432-8025-2ac27b9aa91a';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {

    //This is the url where i need to do the "GET PETITION" to retrieve processors information
    const sneakers = 'https://api.hubapi.com/crm/v3/objects/sneakers/?properties=name,category,color'

    //Necessary headers
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        //Get information of sneakers
        const response = await axios.get(sneakers, { headers });
        const data = response.data.results;
        
        //Render homepage
        res.render('homepage', { title: 'Home | Integrating With HubSpot I Practicum',  sneakers: data});

    } catch (error) {
        console.log(error);
    }
})

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req, res) => {

    try {
        //Render updates page
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });

    } catch (error) {
        console.log(error);
    }

})

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {

    // getting the information to create a new custom object
    const dataToCreate = {
        "properties": {
            "name": req.body.newName,
            "color": req.body.color,
            "category": req.body.category
        }
    }

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    //This is the url where i need to do the "POST PETITION" to create a new custom object
    const url ="https://api.hubapi.com/crm/v3/objects/sneakers/";

    try {
        
        await axios.post(url, dataToCreate, { headers })
        res.redirect('back');

    } catch (error) {
        console.log(error);
    }

})

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));