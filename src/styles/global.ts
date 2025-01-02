import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #f0f2f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Custom CSS Clerk */
  .cl-rootBox {
    
    .cl-card {
    }
    
    .cl-signIn-start {
      box-shadow: unset;
    }

    .cl-socialButtonsBlockButton {
      box-shadow: rgba(0, 0, 0, 0.07) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 2px 3px 5px, rgba(0, 0, 0, 0.02) 0px 1px 0px 0px;
    }

    .cl-logoBox {
      height: 100px;
      
      .cl-logoImage {
        border-radius: 50%;
      }
    }

  }
  
`;
