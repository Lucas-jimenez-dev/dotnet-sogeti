import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class SampleInput implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _valueFirstInput: string
    private _div: HTMLDivElement
    private _firstInput: HTMLInputElement
    private _container: HTMLDivElement
    private _label:HTMLLabelElement
    private _context: ComponentFramework.Context<IInputs>
    private _notifyOutputChanged: () => void
    private _getDataFromInput:EventListenerOrEventListenerObject
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._container = container
        this._context = context
        this._notifyOutputChanged = notifyOutputChanged
        this._valueFirstInput = this._context.parameters.sampleProperty.raw!
        //relier l'event à la méthode
        this._getDataFromInput = this.getDataFromInput.bind(this)
        this._div = document.createElement("div")
        this._div.innerText = "Hello from our first component"
        this._container.appendChild(this._div)
        
        this._firstInput = document.createElement("input")
        this._firstInput.setAttribute("type", "text")
        this._firstInput.setAttribute("placeholder", "Merci de saisir la valeur de votre premier champ : ")
        this._firstInput.setAttribute("value", this._valueFirstInput)
        this._firstInput.addEventListener("input", this._getDataFromInput)
        this._container.appendChild(this._firstInput)

        this._label = document.createElement("label")
        this._container.appendChild(this._label)
    }

    private getDataFromInput() {
        this._valueFirstInput = this._firstInput.value
        this._label.innerText = this._valueFirstInput
        this._notifyOutputChanged()
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {
            sampleProperty: this._valueFirstInput
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
