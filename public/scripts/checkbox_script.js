const CheckBox = (id) => {
  const checkBox = document.querySelector(id);
  const searchBox = checkBox.querySelector(".dropdown");
  const options = checkBox.querySelector(".dropdown_content");
  const selectedOptionsUI = checkBox.querySelector(".selected_boxes");
  const selectedModel = new Set();
  let visible = false;

  const onRemove = (id) => {
    if (selectedModel.has(id)) {
      selectedModel.delete(id);
      for (let selected of selectedOptionsUI.children) {
        if (selected.dataset.id == id) {
          selected.remove();
          break;
        }
      }
    }
  };

  for (let selected of selectedOptionsUI.children) {
    selectedModel.add(selected.dataset.id);
    selected.addEventListener("click", () => {
      onRemove(selected.dataset.id);
    });
  }

  const onAdd = (id, name) => {
    if (!selectedModel.has(id)) {
      selectedModel.add(id);
      const selectedComponent = document.createElement("div");
      selectedComponent.dataset.id = id;
      selectedComponent.classList.add("selected_box");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "games";
      input.value = id;
      input.checked = "true";
      const label = document.createElement("label");
      label.textContent = name;
      selectedComponent.append(input, label);
      selectedComponent.addEventListener("click", () => {
        onRemove(id);
      });
      selectedOptionsUI.append(selectedComponent);
    }
  };

  const onSearch = (val) => {
    const searchTerm = val.trim().toLowerCase();
    for (let option of options.children) {
      if (!option.dataset.name.toLowerCase().startsWith(searchTerm)) {
        option.style.display = "none";
      } else {
        option.style.display = "flex";
      }
    }
  };

  const setVisible = (bool) => {
    visible = bool;
    if (bool) {
      options.style.display = "block";
    } else {
      options.style.display = "none";
    }
  };

  searchBox.addEventListener("focusin", () => {
    setVisible(true);
  });

  window.onclick = (e) => {
    const target = e.target;
    if (!target.matches(".dropdown") && !target.matches(".dropdown_item")) {
      setVisible(false);
    }
  };

  searchBox.addEventListener("input", (e) => {
    onSearch(e.target.value.trim());
  });

  for (let option of options.children) {
    option.addEventListener("click", (e) => {
      const target = e.target;
      onAdd(target.dataset.id, target.dataset.name);
    });
  }
};

CheckBox("#checkbox1");
