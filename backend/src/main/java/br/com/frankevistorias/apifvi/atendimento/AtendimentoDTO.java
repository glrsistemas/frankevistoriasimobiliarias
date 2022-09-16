package br.com.frankevistorias.apifvi.atendimento;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.imobiliaria.ImobiliariaEntity;
import br.com.frankevistorias.apifvi.status.StatusEntity;
import br.com.frankevistorias.apifvi.uriAssets.AssetsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AtendimentoDTO implements Serializable{

    private static final long serialVersionUID = 1L;
    private final AssetsDTO assetsDTO = null;

    @JsonProperty("id")
   	private Long id;

   	@JsonProperty("descricao")
   	private String descricao;

   	@JsonProperty("referenciaImovel")
   	private String referenciaImovel;
       
   	@JsonProperty("mobilia")
   	private String mobilia;

   	@JsonProperty("metragemImovel")
   	private String metragemImovel;

   	@JsonProperty("urgenciaPedido")
   	private String urgenciaPedido;

   	@JsonProperty("obsAdicionais")
   	private String obsAdicionais;

   	@JsonProperty("contestacao")
   	private Boolean contestacao;

   	@JsonProperty("responsavel")
   	private String responsavel;

   @Column(name = "documento")
	@JsonProperty("documento")
	private String documento;

   @JsonProperty("idImobiliaria")
   private ImobiliariaEntity imobiliariaEntity;

   @JsonProperty("idStatus")
   private StatusEntity statusEntity;

    public AtendimentoDTO(AtendimentoEntity atendimentoEntity) {

        this.id                 =   atendimentoEntity.getId();
        this.descricao               = atendimentoEntity.getDescricao();
        this.referenciaImovel          =   atendimentoEntity.getReferenciaImovel();
        this.mobilia                =   atendimentoEntity.getMobilia();
        this.metragemImovel              =   atendimentoEntity.getMetragemImovel();
        this.urgenciaPedido            =   atendimentoEntity.getUrgenciaPedido();
        this.obsAdicionais              =   atendimentoEntity.getObsAdicionais();
        this.contestacao              =   atendimentoEntity.getContestacao();
        this.responsavel              =   atendimentoEntity.getResponsavel();
        this.imobiliariaEntity  =   atendimentoEntity.getImobiliariaEntity();
        AssetsDTO assetsDTO = this.assetsDTO;
        this.statusEntity     =   atendimentoEntity.getStatusEntity();

    }
    
}