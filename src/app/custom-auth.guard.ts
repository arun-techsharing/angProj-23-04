import { CanActivateFn } from '@angular/router';

export const customAuthGuard: CanActivateFn = (route, state) => {

  console.log('passing through Auth Guard')
  console.log('URL of Activated route', route.url[0]);

  let activatedURL;
  if (state.url != null && state.url != '') {
    activatedURL = state.url;
  }

  let userTyp = localStorage.getItem('userType');

  //if user had loggedin or not
  if (userTyp != null && userTyp != '') {
    console.log('index of vlaue',activatedURL?.indexOf('edit-product'));
    //this is verify if user is admin or not?
    if (activatedURL?.indexOf('edit-product') != -1) {
      if (userTyp == 'Admin') {
        return true;
      }
      else {
        return false;
      }
    }
    // this is allowed for normal users who are logged in
    else {
      return true;
    }
  }
  else {
    return false;
  }


};
