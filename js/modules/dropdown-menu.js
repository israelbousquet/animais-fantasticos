import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, classe, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = classe;

    //define como argumento padrao de events
    //caso o usuario nao defina
    if (events === undefined) {
      this.events = ['touchstart', 'click'];
    } else {
      this.events = events;
    }

    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  //ativa o dropdown menu e adiciona a
  //funcao q observa o clique fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  //adiciona os eventos aos dropdown menu
  addEventDropdown() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addEventDropdown();
    }
    return this;
  }
}
