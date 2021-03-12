const responseSuccess = (res, data) => {
    res.status(200);
    res.type("application/json");
    res.json(data);
};

const responseFailed = (res) => {
    res.status(404);
    res.json({ status: 'Not Found' });
};
const responseUnauthorized = (res) => {
    res.status(401);
    res.json({ status: 'Unauthorized' });
};
const responseFailedLogin = (res) => {
    res.status(401);
    res.json({ status: 'Login Failed' });
};

module.exports = { responseSuccess, responseFailed, responseUnauthorized, responseFailedLogin };
  