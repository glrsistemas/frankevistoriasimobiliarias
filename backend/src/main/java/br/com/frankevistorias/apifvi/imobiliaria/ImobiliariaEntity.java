package br.com.frankevistorias.apifvi.imobiliaria;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@Entity
@Table(name = "imobiliaria")
public class ImobiliariaEntity {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long id;

	@NotBlank(message="Nome Fantasia vazio")
    @Column(name = "nome_fantasia")
	@JsonProperty("nomeFantasia")
	private String nomeFantasia;

	@NotBlank(message="Razao Social vazio")
    @Column(name = "razao_social")
	@JsonProperty("razaoSocial")
	private String razaoSocial;

	@NotBlank(message="CNPJ vazio")
    @Column(name = "cnpj", unique=true)
	@JsonProperty("cnpj")
	private String cnpj;

	@Email
	@NotBlank(message="Email vazio")
    @Column(name = "email")
	@JsonProperty("email")
	private String email;

	@NotBlank(message="celular vazio")
	@Column(name = "celular")
	@JsonProperty("celular")
	private String celular;

	@Column(name = "ativo")
	@JsonProperty("ativo")
	private Boolean ativo;

	@Column(name = "dh_registro",columnDefinition="DATETIME")
	@JsonProperty("dhRegistro")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhRegistro;

	@Column(name = "dh_atualizacao",columnDefinition="DATETIME")
	@JsonProperty("dhAtualizacao")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhAtualizacao;

}