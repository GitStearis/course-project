module.exports = function(app, model) {
    app.get('/registration/:email/:username/:password', (req, res) => {
        model.findOne({ username: req.params.username }, function(err, item) {
            if (item === null) {
                let user = {
                    email: req.params.email,
                    username: req.params.username,
                    password: req.params.password
                };

                console.log(user);

                model.create(user, function(err, item) {
                    res.json({ isCreated: false });
                });
            } else {
                res.json({ isCreated: false });
            }
        });
    });
};