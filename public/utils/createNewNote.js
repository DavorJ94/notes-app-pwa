function createNewNote({
  id,
  titleInput,
  labelInput = "",
  bkgColor = "white",
  textColor = "#5f6368",
  noteInput,
}) {
  const noteContainer = document.querySelector(".note-container");
  const note = document.createElement("div");

  note.classList.add("note");
  note.style.backgroundColor = bkgColor;
  note.setAttribute("id", `note-${id}`);
  note.setAttribute("name", `${id}`);

  let eachLabelItem = labelInput
    .replace(/, /g, ",")
    .split(",")
    .map((item) => {
      if (item) return `<div class="label" name=${id}>${item.trim()}</div>`;
    })
    .join("");
  const object = JSON.stringify({
    id,
    titleInput,
    labelInput,
    bkgColor,
    textColor,
    noteInput,
  });
  let labelContainer = `<div class="labelContainer" id="labelContainer-${id}" name="labelContainer-${id}">${eachLabelItem}</div>`;
  note.innerHTML = `
  <div class="noteTitle" id='title-${id}' style='${
    titleInput ? "" : "font-size: 10px; font-style: italic;"
  } color: ${textColor}' name=${id}>${
    titleInput ? titleInput : "(no title)"
  } </div>
  <div class="noteText" id='text-${id}' style='${
    noteInput ? "" : "font-size: 10px; font-style: italic;"
  } color: ${textColor}' name=${id}>${
    noteInput ? noteInput : "(no description)"
  } </div>
  <div class="labelAndIconsContainer">
    ${labelContainer}
    <div class="trash-and-color-container" name=${object} id="trashAndPalette-${id}">
      <div class="buttonAll buttonTrash" ><i name=${id} class="fas fa-trash buttonTrash"></i></div>
      <label>
      <input type="checkbox" class="inputForTooltip" name=${id} style="display:none;" />

        <div class="buttonAll buttonPalette"><i name=${id} class="fas fa-palette palette">

        <div class="color-tooltip" name=${id} id="tooltip-${id}"">
          <div class="color-option" data-color="#fff" data-text-color="#5f6368" id="white"></div>
          <div class="color-option" data-color="#d7aefb" data-text-color="black" id="purple"></div>
          <div class="color-option" data-color="#fbbc04" data-text-color="black" id="orange"></div>
          <div class="color-option" data-color="#a7ffeb" data-text-color="black" id="teal"></div>
          <div class="color-option" data-color="#46c221" data-text-color="black" id="green"></div>
          <div class="color-option" data-color="#ffff00" data-text-color="black" id="yellow"></div>
          </div></i></div>
      </label>
    </div>
    </div>
  `;
  noteContainer.insertBefore(note, noteContainer.childNodes[0]);
}
export default createNewNote;
