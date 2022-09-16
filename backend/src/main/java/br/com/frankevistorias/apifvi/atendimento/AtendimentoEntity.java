package br.com.frankevistorias.apifvi.atendimento;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.imobiliaria.ImobiliariaEntity;
import br.com.frankevistorias.apifvi.status.StatusEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@Entity
@Table(name = "atendimento")
public class AtendimentoEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long id;

	@NotBlank(message = "descricao vazia")
	@Column(name = "descricao")
	@JsonProperty("descricao")
	private String descricao;

	@NotBlank(message = "referencia imovel vazia")
	@Column(name = "referencia_imovel")
	@JsonProperty("referenciaImovel")
	private String referenciaImovel;

	@NotBlank(message = "mobilia vazia")
	@Column(name = "mobilia")
	@JsonProperty("mobilia")
	private String mobilia;

	@NotBlank(message = "metragem vazio")
	@Column(name = "metragem_imovel")
	@JsonProperty("metragemImovel")
	private String metragemImovel;

	@Column(name = "urgencia_pedido")
	@JsonProperty("urgenciaPedido")
	private String urgenciaPedido;

	@NotBlank(message = " Obs adicionais vazio")
	@Column(name = "obs_adicionais")
	@JsonProperty("obsAdicionais")
	private String obsAdicionais;

	@Column(name = "contestacao")
	@JsonProperty("contestacao")
	private Boolean contestacao;

	@Column(name = "responsavel")
	@JsonProperty("responsavel")
	private String responsavel;

	@Column(name = "documento")
	@JsonProperty("documento")
	private String documento;

	@JoinColumns({ @JoinColumn(name = "id_imobiliaria", referencedColumnName = "id") })
	@JsonProperty("idImobiliaria")
	@ManyToOne()
	private ImobiliariaEntity imobiliariaEntity;

	@JoinColumns({ @JoinColumn(name = "id_status", referencedColumnName = "id") })
	@JsonProperty("idStatus")
	@ManyToOne()
	private StatusEntity statusEntity;

	@Column(name = "dh_registro",columnDefinition="DATETIME")
	@JsonProperty("dhRegistro")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhRegistro;

	@Column(name = "dh_atualizacao",columnDefinition="DATETIME")
	@JsonProperty("dhAtualizacao")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhAtualizacao;

}