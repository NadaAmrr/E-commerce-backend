export const createHtml = ({code} = {}) => {
  return `
<!DOCTYPE html>
<html>
<body>
   <p>${code}</p>
   <p></p>
</body>
</html>`;
};
