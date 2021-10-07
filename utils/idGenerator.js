function IdGenerator(input) {
  let localKeys = Object.keys(localStorage);
  let parsedArray = localKeys.map((x) => +x); // converting to integers

  if (input.id === "") {
    let i = 1;
    while (true) {
      if (parsedArray.includes(i)) i++;
      else break;
    }
    return i.toString();
  } else {
    return input.id;
  }
}

export default IdGenerator;
