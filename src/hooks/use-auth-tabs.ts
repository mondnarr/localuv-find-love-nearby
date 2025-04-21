
export const useAuthTabs = () => {
  const switchToSignup = () => {
    const signupTab = document.querySelector('[data-state="inactive"][value="signup"]') as HTMLElement;
    if (signupTab) {
      signupTab.click();
    }
  };
  
  const switchToLogin = () => {
    const loginTab = document.querySelector('[data-state="inactive"][value="login"]') as HTMLElement;
    if (loginTab) {
      loginTab.click();
    }
  };

  return {
    switchToSignup,
    switchToLogin
  };
};
