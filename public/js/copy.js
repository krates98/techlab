function myFunction(arg) {
    var copyText = document.querySelectorAll("input");
    copyText[arg].select();
    copyText[arg].setSelectionRange(0, 99999)
    document.execCommand("copy");
  }