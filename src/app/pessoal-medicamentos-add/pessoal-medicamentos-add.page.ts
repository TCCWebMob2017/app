import { PessoalService } from "./../services/pessoal.service";
import { NavController, AlertController, Platform } from "@ionic/angular";
import { Component, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { ActivatedRoute, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-pessoal-medicamentos-add",
  templateUrl: "./pessoal-medicamentos-add.page.html",
  styleUrls: ["./pessoal-medicamentos-add.page.scss"]
})
export class PessoalMedicamentosAddPage implements OnInit {
  @ViewChild("searchBar", { static: false }) myInput;

  public lista_items: any;
  searchTerm: string = "";

  constructor(
    public navCtrl: NavController,
    public pessoalService: PessoalService,
    private storage: StorageService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }

  ionViewDidLoad() {}
  ionViewDidEnter() {}
  ionViewWillLeave() {}
  ionViewDidLeave() {}
  ionViewWillUnload() {}

  /*
  setFilteredItems(ev: any) {
    let val = ev.target.value;
    this.medicamentos = this.pessoalService.filterItems(this.medicamentos_all, val);
  }
  */

  selecionarRegistro(value: any) {
    if (value != null) {
      this.alertConfirmarAdicaoDeItem(value);
    }
  }

  async alertConfirmarAdicaoDeItem(value: any) {
    const alert = await this.alertController.create({
      header: "Adicionar medicamento",
      message: "O item <b>" + value["nome"] + "</b> será adicionado.",
      inputs: [
        {
          name: "frequencia",
          type: "text",
          value: "",
          placeholder: "Frequência de uso"
        },
        { name: "dosagem", type: "text", value: "", placeholder: "Dosagem" },
        {
          name: "viaAdministracao",
          type: "text",
          value: "",
          placeholder: "Via de administração"
        },
        {
          name: "observacao",
          type: "text",
          value: "",
          placeholder: "Observação"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            //console.log('Confirm Cancel');
          }
        },
        {
          text: "Ok",
          handler: (data = Response) => {
            let _value = this.addRegistro(value, data);
            this.navCtrl.navigateBack(["pessoal-medicamentos"]);
          }
        }
      ]
    });
    await alert.present();
  }

  addRegistro(value: any, data: any): any {
    let _novoRegistro = value;
    let _medicamento = {};
    _medicamento["privacidade"] = {};
    _medicamento["frequencia"] = data["frequencia"];
    _medicamento["dosagem"] = data["dosagem"];
    _medicamento["viaAdministracao"] = data["viaAdministracao"];
    _medicamento["observacao"] = data["observacao"];
    _medicamento["medicamento"] = _novoRegistro;
    this.storage.addMedicamentos(_medicamento);
    return _medicamento;
  }

  search(nome: string) {
    nome = nome.toLowerCase();
    this.pessoalService.getMedicamentosPorNome(nome).subscribe(
      Response => {
        this.lista_items = Response;

        setTimeout(() => {
          this.myInput.setFocus();
        }, 150);
      },
      error => {
        //console.log(error);
      }
    );
  }
}
