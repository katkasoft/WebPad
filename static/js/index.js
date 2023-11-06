var editor

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function lighttheme() {
    editor.setTheme("ace/theme/cloud9_day");
    document.body.style.backgroundColor = "#fff"
    document.body.style.color = "#000"
    document.querySelectorAll('select').forEach((el) => {
        el.style.color = "#000"
        el.style.backgroundColor ="#e8eaeb"
        el.style.borderColor = "#e8eaeb"
    })
}

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.download = this.download.bind(this)
        this.changelang = this.changelang.bind(this)
        this.changetheme = this.changetheme.bind(this)
        this.openview = this.openview.bind(this)
        this.open = this.open.bind(this)
        this.run = this.run.bind(this)
    }
    run() {
        console.clear()
        eval(editor.getValue())
    }
    open() {
        var input = document.getElementById('file')
        if (input.value) {
            var fileToLoad = input.files[0]
            var fileReader = new FileReader()
            fileReader.onload = function(fileLoadedEvent){
                var textFromFileLoaded = fileLoadedEvent.target.result
                editor.insert(textFromFileLoaded)
            }

            fileReader.readAsText(fileToLoad, "UTF-8")
            document.getElementById('window').style.display = 'none'
        }
    }
    openview() {
        const win = ReactDOM.createRoot(document.getElementById('window'))
        win.render(
            <div>
                <button id="close" onClick={() => {document.getElementById('window').style.display = 'none'}}>x</button>
                <div>
                    <h1 id="windowtitle">Open a file</h1>
                    <input type="file" name="file" id="file" />
                    <button className="btn" onClick={this.open}>Open</button>
                </div>
            </div>
        )
        document.getElementById('window').style.display = 'block'
    }
    download() {
        var filename = prompt('Enter name of file (with extension)')
        if (filename != null) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.getValue()));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
    changetheme() {
        var theme = document.getElementById('theme').value
        if (theme == 'light') {
            document.cookie = 'theme=light; expires=Tue, 01 Jan 2030 00:00:00 UTC;'
            lighttheme()
        } else {
            document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.body.style.backgroundColor = "#23232b"
            document.body.style.color = "#fff"
            editor.setTheme("ace/theme/github_dark");
            document.querySelectorAll('select').forEach((el) => {
                el.style.color = "#fff"
                el.style.backgroundColor ="#323232"
                el.style.borderColor = "#323232"
            })
        }
    }
    changelang() {
        var lang = document.getElementById('lang').value
        var editorview = document.getElementById('editor')
        editor.session.setMode("ace/mode/" + lang);
        var runbtn = document.getElementById('run') 
        if (lang == 'html') {
            const iframe = ReactDOM.createRoot(document.getElementById('iframe'))
            iframe.render(
                <iframe></iframe>
            )
            editorview.style.width = '60vw'
            setInterval(() => {
                document.querySelector('iframe').srcdoc = editor.getValue()
            }, 1000)
        } else if (lang == 'javascript') {
            runbtn.style.display = 'inline'
            document.querySelector('iframe').remove()
            editorview.style.width = '100vw'
        } else {
            runbtn.style.display = 'none'
            document.querySelector('iframe').remove()
            editorview.style.width = '100vw'
        }
    }
    render() {
        return (
            <div id="top">
                <header>
                    <h1 onClick={window.location.hash = ''}>Webpad</h1>
                </header><hr />
                <div id="toolbox">
                    <div id="toolboxbuttons">
                        <button title="Ctrl+O" onClick={this.openview}>Open</button>
                        <button title="Ctrl+S" onClick={this.download}>Download</button>
                        <button title="Ctrl+R" id="run" onClick={this.run}>Run</button>
                    </div>
                    <div id="toolboxoptions">
                        <select id="lang" title="Select type of text" onChange={this.changelang}>
                            <option value="text" selected>Text</option>
                            <option value="markdown">MarkDown</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="sql">SQL</option>
                            <option value="php">PHP</option>
                            <option value="java">Java</option>
                            <option value="c_cpp">C/C++</option>
                            <option value="csharp">C#</option>
                            <option value="json">JSON</option>
                            <option value="xml">XML</option>
                            <option value="golang">Go</option>
                            <option value="rust">Rust</option>
                            <option value="ruby">Ruby</option>
                            <option value="kotlin">Kotlin</option>
                            <option value="swift">Swift</option>
                            <option value="sh">Shell</option>
                            <option value="r">R</option>
                            <option value="scala">Scala</option>
                            <option value="perl">Perl</option>
                            <option value="objectivec">Objective-C</option>
                            <option value="dart">Dart</option>
                            <option value="matlab">MatLab</option>
                            <option value="assembly_x86">Assembly x86</option>
                            <option value="cobol">Cobol</option>
                            <option value="vbscript">Visual Basic Script</option>
                        </select>
                        <select id="theme" title="Choose the theme of editor" onChange={this.changetheme}>
                            <option value="dark" selected>Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </div>
                </div><hr />
            </div>
        )
    }
    componentDidMount() {
        if (getCookie('theme') == 'light') {
            document.getElementById('theme').value = "light"
        }
    }
}



class Editor extends React.Component {
    render() {
        return (
            <main>
                <pre id="editor"></pre>
                <div id="iframe"></div>
            </main>
        )
    }
    componentDidMount() {
        editor = ace.edit("editor");
        editor.setTheme("ace/theme/github_dark");
        editor.session.setMode("ace/mode/text");
        if (getCookie('theme') == 'light') {
            lighttheme()
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
    <div>
        <Header />
        <Editor />
    </div>
)

document.onkeydown = (e) => {
    var action = new Header() 
    if (e.ctrlKey && e.key == 'o') {
        action.openview()
        return false
    }
    if (e.ctrlKey && e.key == 's') {
        action.download()
        return false
    }
    if (e.ctrlKey && e.key == 'r') {
        action.run()
        return false
    }
}