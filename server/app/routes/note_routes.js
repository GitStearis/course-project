module.exports = function(app, model) {
    app.get('/registration/:email/:username/:password', (req, res) => {
        console.log('here');
        model.findOne({ username: req.params.username }, function(err, item) {
            if (item === null) {
                let user = {
                    email: req.params.email,
                    username: req.params.username,
                    password: req.params.password
                };

                console.log(user);

                model.create(user, function(err, item) {
                    res.json("true");
                });
            } else {
                res.json("false");
            }
        });
    });

    app.get('/login/:email/:username/:password', (req, res) => {
        model.findOne({ email: req.params.email, username: req.params.username, password: req.params.password }, function(err, item) {
            if (item === null) {
                res.json("false");
            } else {
                let user = {
                    email: req.params.email,
                    username: req.params.username,
                    password: req.params.password
                };

                console.log(user);

                model.create(user, function(err, item) {
                    res.json(user);
                });
            }
        });
    });
};