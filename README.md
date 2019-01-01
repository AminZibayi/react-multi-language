### In the Name of Allah

# React-MultiLang

Helps you create multi-language pages.

- No server needed.
- Async support.
- No dependencies.
- Universal.
- Micro library.

## Installation

**with npm**:

    npm install react-multilang --save

**with yarn**:

    yarn add react-multilang

## API Reference

### Determinator

returns a string or component.

**Props:**

- `children`: `union(function, string, object)`: 
  - `function`: can be an async function, the function will receive two arguments:
    - First is the current language, the function will be called anytime language changes(by `MultiLang`).
    - Second is a function which updates the currently displayed content by `Determinator` to the content that it receives according to the new language
  - `string`: it will return the string with no mutation.
  - `object`: it must follow below pattern and returns the value of the matched key (based on `props.lang` of `MultiLang`).
```javascript
  {
    [language]: [content]
  }
  // e.g.
  {
    fr: "Bonjour le monde",
    en: "Hello World"
  }
 ```
- `till`: `union(component, string)`: `Determinator` renders the value of `props.till` untill the async function that is passed as `props.children` to `Determinator` update the currently displayed content.

### MultiLang

must be after all the Determinators.

**Props:** 
`lang`: `string`: the current language will be applied to the Determinators.

## Examples

```javascript
import React, { Component } from "react";
import { MultiLang, Determinator } from "react-multilang";

class App extends Component {
  state = {
    lang: "en",
  };

  changeLang = () => {
    this.setState(state => ({ lang: state.lang === "en" ? "fr" : "en" }));
  };

  render() {
    return (
      <div onClick={this.changeLang}>
        <Determinator>
          {{
            fr: "Bonjour le monde",
            en: "Hello World"
          }}
        </Determinator>
        <Determinator till={<span>Loading...</span>}>
          {async (lang, add) => {
            setTimeout(() => {
              if (lang == 'fr') 
                add("Bonjour le monde")
              if (lang == 'en') 
                add("Hello World");
              }
            , 1000);
          }}
        </Determinator>
        <Determinator>
          {"Hello World"}
        </Determinator>
        {/*MultiLang component must be after all the Determinators*/}
        <MultiLang lang={this.state.lang}/>
      </div>
    );
  }
}

export default App;
```
Fetching data when needed is one of the most common case for async functions:

```javascript
import React, { Component } from "react";
import { MultiLang, Determinator } from "react-multilang";

class App extends Component {
  state = {
    lang: "en",
  };

  changeLang = () => {
    this.setState(state => ({ lang: state.lang === "en" ? "fr" : "en" }));
  };

  render() {
    return (
      <div onClick={this.changeLang}>
        <Determinator till={<span>Loading...</span>}>
          {async (lang, add) => {
            fetch(`http://example.com/${lang}.json`)
              .then(response => {
                return response.json();
              })
              .then(json => {
                add(JSON.stringify(json).content);
              });
          }}
        </Determinator>
        {/*MultiLang component must be after all the Determinators*/}
        <MultiLang lang={this.state.lang}/>
      </div>
    );
  }
}

export default App;
```

## License

MIT License
