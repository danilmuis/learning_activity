const responseSuccess = (res, data) => {
    res.status(200);
    res.type("application/json");
    res.json(data);
};

const responseFailed = (res) => {
    res.status(404);
    res.json({ status: 'Not Found' });
};

module.exports = { responseSuccess, responseFailed };
  