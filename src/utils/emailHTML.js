export const createHtml = ({ msg, code } = {}) => {
  return `
<!DOCTYPE html>
<html>
<body>
   <p>${msg}</p>
   <p>${code}</p>
</body>
</html>`;
};
