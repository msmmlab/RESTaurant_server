const PORT = process.env.PORT || 3030;

module.exports = function (app) {
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
};
