module.exports = function(app, model) {
    app.get('/registration/:email/:username/:password', (req, res) => {
        model.findOne({ username: req.params.username }, function(err, item) {
            if (item === null) {
                let user = {
                    email: req.params.email,
                    username: req.params.username,
                    password: req.params.password
                };

                model.create(user, function(err, item) {
                    res.send("User is created");
                });
            } else {
                res.send(item.blocked);
            }
        });
    });

};