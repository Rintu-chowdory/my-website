// Add your middleware logic here
app.use((req, res, next) => {
  // handle unsupported routes
  res.status(404).send('Not Found');
});