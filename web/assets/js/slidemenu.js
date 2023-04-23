class SlideMenu {
    // public properties
    buttonID;
    menuID;
    menuButton;
    menuPanel;
    menuClassList;

    // constructor
    constructor(buttonID, menuID) {
      this.buttonID = buttonID;
      this.menuID = menuID;

      this.menuButton = document.querySelector('#'+this.buttonID);
      this.menuPanel = document.querySelector('#'+this.menuID);

      this.menuClassList = this.menuPanel.classList;

      this.addMobileEventListeners();
    }

    // Methods
    addMobileEventListeners() {
        let thisData = this;

        this.menuButton.addEventListener('click', () => {
            thisData.menuToggle();
        });

        document.body.addEventListener('click', function( event ){
            if ( (event.target.id === thisData.menuID) || (event.target.id ===(thisData.buttonID)) ) {
                return;
            }
            else if ( (event.target.id != thisData.menuID) ) {
                thisData.menuClose();
            }
    
        });
    }

    menuToggle() {
        this.menuClassList.toggle('open');
    }

    menuOpen() {
        this.menuClassList.add('open');
    }

    menuClose() {
        this.menuClassList.remove('open');
    }
}
  

