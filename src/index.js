import "./main.css"

const mainPanel = (function(){

    // Variables to status of the main panel
    let home = true;
    let today = false;
    let week = false;
    let note = false;

    //Catch DOM
    const addButton = document.querySelector("button[id='plusButton']");

    //Bind elements
    addButton.addEventListener("click",() =>{
        createElement.showToCreate();
        createElement.changeToToDoWindow();
    })

    function createBlurBackground() {
        //Create blur div
        const blurBackground = document.createElement("div");
        blurBackground.id = "blurBackground";

        //Bind element
        blurBackground.addEventListener("click", _removeBlurBackground);

        return blurBackground;
    }

    function _removeBlurBackground() {
        //Cath DOM
        const blurBackground = document.getElementById("blurBackground");
        const mainContainer = document.getElementById("mainContainer");

        //Remove
        if (blurBackground && mainContainer) {
            document.body.removeChild(blurBackground);
            document.body.removeChild(mainContainer);
            createElement.setAllToBegin();
        }
    }

    function createProject(){

    }

    function createNote(){

    }

    function createToDo(){

        // Create elements
        const elementDiv = document.createElement("div");
        elementDiv.classList.add("toDoElement");
        const leftElementDiv = document.createElement("div");
        leftElementDiv.classList.add("toDoLeft");
        const rightElementDiv = document.createElement("div");
        rightElementDiv.classList.add("toDoRight");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("checkBox");
        const title = document.createElement("h3");
        title.classList.add("title");
        const details = document.createElement("button");
        details.textContent = "Details";
        details.classList.add("details");
        const date = document.createElement("h5");
        date.classList.add("date");
        const edit = document.createElement("img");
        edit.classList.add("edit-delete");
        edit.src = "./images/edit.png";
        const deleteImg = document.createElement("img");
        deleteImg.classList.add("edit-delete");
        deleteImg.src = "./images/delete.png";

        // Add elements
        const rightPanel = document.getElementById("rightPanel");
        rightElementDiv.appendChild(checkBox);
        rightElementDiv.appendChild(title);
        leftElementDiv.appendChild(details);
        leftElementDiv.appendChild(date);
        leftElementDiv.appendChild(edit);
        leftElementDiv.appendChild(deleteImg);
        elementDiv.appendChild(rightElementDiv);
        elementDiv.appendChild(leftElementDiv);
        rightPanel.appendChild(elementDiv);
    }

    return {
        createBlurBackground,
        createProject,
        createNote,
        createToDo
    }

})();

const createElement = (function(){

    //Variables to status of the right panel
    let toDoWindow = false;
    let projectWindow = false;
    let noteWindow = false;

    function showToCreate(){
        //Create elements
        const mainContainer = _createMainContainer();
        const blurBackground = mainPanel.createBlurBackground();
        _applyStyle();
        //Add elements
        document.body.appendChild(blurBackground);
        document.body.appendChild(mainContainer);
    }

    function _createMainContainer(){
        //Container
        const mainContainer = document.createElement("div");
        mainContainer.id = "mainContainer";

        //Header
        const header = _createHeader();

        //Panel
        const panel = _createPanel();
        
        //Add elements
        mainContainer.appendChild(header);
        mainContainer.appendChild(panel);
        
        return mainContainer;
    }

    function _createHeader(){
        //Header
        const header = document.createElement("header");
        header.id = "header";
        const h4 = _createH("headerWord","Create a new...","h4",false);

        //Add element
        header.appendChild(h4);

        return header;
    }

    function _createPanel(){
        //Panel
        const panel = document.createElement("div");
        panel.id = "panel";
        const leftPanel = _createLeftPanel();
        const rightPanel = _createRightPanel();

        //Add elements
        panel.appendChild(leftPanel);
        panel.appendChild(rightPanel);

        return panel
    }


    function _createLeftPanel(){
        //Left Panel
        const leftPanel = document.createElement("div");
        leftPanel.id = "leftPanel";

        //Left Panel: Nav
        const nav = document.createElement("nav");
        nav.id = "topLeftPanel";
        const ul = document.createElement("ul");

        const liToDo = _createLI("liToDo");
        const liProject = _createLI("liProject");
        const liNote = _createLI("liNote");

        const h6ToDo = _createH("h6ToDo","To Do","h6",true);
        h6ToDo.classList.add("activedText");
        const h6Project = _createH("h6Project","Project","h6",true);
        const h6Note = _createH("h6Note","Note","h6",true);

        //Bind events
        h6ToDo.addEventListener("click", changeToToDoWindow);
        h6Project.addEventListener("click", _changeToProjectWindow);
        h6Note.addEventListener("click", _changeToNoteWindow);

        //Add elements
        liToDo.appendChild(h6ToDo);
        liProject.appendChild(h6Project);
        liNote.appendChild(h6Note);
        ul.appendChild(liToDo);
        ul.appendChild(liProject);
        ul.appendChild(liNote);
        nav.appendChild(ul);
        leftPanel.appendChild(nav);
        
        return leftPanel
    }

    function _createRightPanel(){
        //Right Panel
        const rightPanel = document.createElement("div");
        rightPanel.id = "rightPanel";

        //Form
        const form = document.createElement("form");
        form.id = "form";
        const fieldSet = document.createElement("fieldset");
        fieldSet.id = "fieldSet";

        form.appendChild(fieldSet);
        rightPanel.appendChild(form);

        return rightPanel
    }

    function _createToDoPanel(fieldSet){
        //Inside Form
        const titleDiv = _createTitle();
        const textAreaDiv = _createTextArea();
        const timeDiv = _createTime();
        const priorityAddDiv = _createPriorityAdd();

        //Line breaker
        const lineBreaker1 = document.createElement("hr");
        const lineBreaker2 = document.createElement("hr");
        const lineBreaker3 = document.createElement("hr");

        //Add elements
        fieldSet.appendChild(titleDiv);
        fieldSet.appendChild(lineBreaker1);
        fieldSet.appendChild(textAreaDiv);
        fieldSet.appendChild(lineBreaker2);
        fieldSet.appendChild(timeDiv);
        fieldSet.appendChild(lineBreaker3);
        fieldSet.appendChild(priorityAddDiv);

        toDoWindow = true;
        projectWindow = false;
        noteWindow = false;
    }

    function _createProjectPanel(fieldSet){
        const titleDiv = _createTitle();
        const submitButton = _createSubmitButton("note-project-submit","CREATE PROJECT");

        //Line Braker
        const lineBreaker = document.createElement("hr");

        //Add elements
        fieldSet.appendChild(titleDiv);
        fieldSet.appendChild(lineBreaker);
        fieldSet.appendChild(submitButton);

        toDoWindow = false;
        projectWindow = true;
        noteWindow = false;
    }

    function _createNotePanel(fieldSet){
        const titleDiv = _createTitle();
        const textarea = _createTextArea();
        const submitButton = _createSubmitButton("note-project-submit","CREATE NOTE");

        //Line Breaker
        const lineBreaker1 = document.createElement("hr");
        const lineBreaker2 = document.createElement("hr");

        //Add elements
        fieldSet.appendChild(titleDiv);
        fieldSet.appendChild(lineBreaker1);
        fieldSet.appendChild(textarea);
        fieldSet.appendChild(lineBreaker2);
        fieldSet.appendChild(submitButton);

        toDoWindow = false;
        projectWindow = false;
        noteWindow = true;
    }

    function _createTitle(){
        //Right Panel: Title
        const titleDiv = document.createElement("div");
        titleDiv.id = "titleDiv";
        const titleInput = document.createElement("input");
        titleInput.id = "titleInput";
        titleInput.type = "text";
        titleInput.name = "title";
        titleInput.placeholder = "Title: ...";
        titleInput.required = true;
        titleInput.maxLength = "100";
        
        //Add element
        titleDiv.appendChild(titleInput);

        return titleDiv
    }

    function _createTextArea(){
        //Right Panel: Text Area
        const textAreaDiv = document.createElement("div");
        textAreaDiv.id = "textAreaDiv";
        const textAreaInput = document.createElement("textarea");
        textAreaInput.id = "textAreaInput";
        textAreaInput.placeholder = "Details...";
        textAreaInput.name = "details";

        //Add element
        textAreaDiv.appendChild(textAreaInput);

        return textAreaDiv
    }

    function _createTime(){
        //Right Panel: Date
        const timeDiv = document.createElement("div");
        timeDiv.id = "dueTimeDiv";
        const timeLabel = document.createElement("label");
        timeLabel.id = "timeLabel";
        timeLabel.textContent = "Due Date:";
        const timeInput = document.createElement("input");
        timeInput.id = "timeInput";
        timeInput.type = "date";
        timeInput.required = true;

        //Add elements
        timeDiv.appendChild(timeLabel);
        timeDiv.appendChild(timeInput);
        
        return timeDiv
    }

    function _createPriorityAdd(){
        //Right Panel: Priority
        const priorityAddDiv = document.createElement("div");
        priorityAddDiv.id = "priorityAddDiv";
        const priorityLabel = document.createElement("label");
        priorityLabel.id = "priorityLabel";
        priorityLabel.textContent = "Priority:";

        //Priorirty radio buttons
        const lowInput = _createRadioButton("lowInput","low");
        const lowLabel = _createLabel("lowLabel","Low","lowInput","priorityLabel");
        const mediumInput = _createRadioButton("mediumInput","medium");
        const mediumLabel = _createLabel("mediumLabel","Medium","mediumInput","priorityLabel");
        const highInput = _createRadioButton("highInput","high");
        const highLabel = _createLabel("highLabel","High","highInput","priorityLabel");
        const divRadioButtons = document.createElement("div");
        divRadioButtons.id = "radioButtonsDiv";

        //Priority: Submit
        const submitButton = _createSubmitButton("toDoSubmit","ADD TO DO");

        //Div between radio & submit button
        const divBetweenRadio = document.createElement("div");
        divBetweenRadio.id = "divBetweenRadio";
        const divBetweenSubmit = document.createElement("div");
        divBetweenSubmit.id = "divBetweenSubmit";

        //Add elements
        divRadioButtons.appendChild(lowLabel);
        divRadioButtons.appendChild(lowInput);
        divRadioButtons.appendChild(mediumLabel);
        divRadioButtons.appendChild(mediumInput);
        divRadioButtons.appendChild(highLabel);
        divRadioButtons.appendChild(highInput);
        divBetweenRadio.appendChild(priorityLabel);
        divBetweenRadio.appendChild(divRadioButtons);
        divBetweenSubmit.appendChild(submitButton)
        priorityAddDiv.appendChild(divBetweenRadio);
        priorityAddDiv.appendChild(divBetweenSubmit);

        return priorityAddDiv
    }


    function _createLI(idLi){
        //LI
        const li = document.createElement("li");
        li.id = idLi;

        return li
    }

    function _createH(idH6,textH6,typeH,bindEvent){
        //H6
        const h6 = document.createElement(typeH);
        h6.id = idH6;
        h6.textContent = textH6;

        if(bindEvent) h6.addEventListener("click", (event) => _toggleActiveText(event));

        return h6
    }

    function _createSubmitButton(idSubmit,textInside){
        const submitButton = document.createElement("button");
        submitButton.id = idSubmit;
        submitButton.textContent = textInside;
        submitButton.type = "submit";

        submitButton.addEventListener("click", () => createIdea);

        return submitButton
    }

    function _createRadioButton(idInput,valueInput){
        const radioInput = document.createElement("input");
        radioInput.id = idInput;
        radioInput.type = "radio";
        radioInput.name = "priority";
        radioInput.value = valueInput;
        radioInput.required = true;

        return radioInput
    }

    function _createLabel(idLabel,textLabel,valueInput,classLabel){
        //Label
        const label = document.createElement("label");
        label.id = idLabel;
        label.textContent = textLabel;
        label.htmlFor = valueInput;
        label.className = classLabel;

        label.addEventListener("click", (event) => _togglePriorityLabel(event));

        return label
    }

    function _applyStyle(){
        //Add the style to the created panel
        import("./newElements.css")
            .catch((err) => {
                console.log("Error loading newElements.css", err);
            })
    }

    function _removeElementsFromFieldSet(fieldSet){
        //Clear rightPanel
        while(fieldSet.firstChild){
            fieldSet.removeChild(fieldSet.firstChild);
        }
    }

    function _toggleActiveText(event){
        const clickedH6 = event.target;
        const mainContainer = document.querySelector("#mainContainer");
        if(mainContainer){
            const ul = mainContainer.querySelector("ul");
            if(ul){
                const children = ul.children;
                for(let i=0;i<children.length;i++){
                    const son = children[i];
                    const h6 = son.querySelector("h6");
                    if(h6){
                        h6.classList.remove("activedText");
                    }
                }
                clickedH6.classList.add("activedText");
            }
        }
        else{
            alert("No main container created");
        }

    }

    function _togglePriorityLabel(event){
        const clickedLabel = event.target;
        const mainContainer = document.querySelector("#mainContainer");
        if(mainContainer){
            const radioButtonsDiv = mainContainer.querySelector("#radioButtonsDiv");
            if(radioButtonsDiv){
                const labels = radioButtonsDiv.querySelectorAll("label");
                labels.forEach(label => {
                    label.classList.remove("activedLabel");
                })
                clickedLabel.classList.add("activedLabel");
            }
        }
        else{
            alert("No main container created");
        }
    }

    function changeToToDoWindow(){
        //Check mainContainer already created
        if(!toDoWindow){
            const mainContainer = document.querySelector("#mainContainer");
            if(mainContainer){
                const fieldSet = mainContainer.querySelector("#fieldSet");
                _removeElementsFromFieldSet(fieldSet);
                _createToDoPanel(fieldSet);
            }
            else{
                alert("No mainContainer created")
            }
        }
    }

    function _changeToProjectWindow(){
        if(!projectWindow){
            const mainContainer = document.querySelector("#mainContainer");
            if(mainContainer){
                const fieldSet = mainContainer.querySelector("#fieldSet");
                _removeElementsFromFieldSet(fieldSet);
                _createProjectPanel(fieldSet);
            }
            else{
                alert("No mainContainer created")
            }
        }
    }

    function _changeToNoteWindow(){
        if(!noteWindow){
            const mainContainer = document.querySelector("#mainContainer");
            if(mainContainer){
                const fieldSet = mainContainer.querySelector("#fieldSet");
                _removeElementsFromFieldSet(fieldSet);
                _createNotePanel(fieldSet);
            }
            else{
                alert("No mainContainer created")
            }
        }
    }

    function setAllToBegin(){
        toDoWindow = false;
        projectWindow = false;
        noteWindow = false;
    }

    function createIdea(){

        const blurBackground = document.getElementById("blurBackground");
        const mainContainer = document.getElementById("mainContainer");

        //Remove
        if (blurBackground && mainContainer) {
            document.body.removeChild(blurBackground);
            document.body.removeChild(mainContainer);
        }
        console.log("by");
        if(toDoWindow){
            setAllToBegin();
            console.log("Hi");
            mainPanel.createToDo();
        }
        else if(projectWindow){
            mainPanel.createProject();
        }
        else{
            mainPanel.createNote();
        }
    }

    return{
        showToCreate,
        changeToToDoWindow,
        setAllToBegin
    }

})();