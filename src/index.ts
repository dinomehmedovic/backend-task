import app from "./app";

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT || 3000, () => {
  console.log(`Listening on port ${PORT}`);
});
