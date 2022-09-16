package br.com.frankevistorias.apifvi.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.imobiliaria.ImobiliariaEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@Entity
@Table(name = "usuario")
public class UsuarioEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long	id;
	
	@NotBlank(message = "Nome vazio")
    @Column(name = "nome")
	@JsonProperty("nome")
	private String nome;

	@NotBlank(message = "Sobrenome vazio")
    @Column(name = "sobrenome")
	@JsonProperty("sobrenome")
	private String sobrenome;

    @Column(name = "cpf", unique = true)
	@JsonProperty("cpf")
	private String cpf;

	@Column(name="login", unique = true)
	@JsonProperty("login")
	private String login;

	@Email
	@NotBlank(message = "email vazio")
    @Column(name = "email")
	@JsonProperty("email")
	private String email;

	@NotBlank(message = "Celular vazio")
    @Column(name = "celular")
	@JsonProperty("celular")
	private String celular;

	@NotBlank(message = "senha vazia")
    @Column(name = "senha")
	@JsonProperty("senha")
	private String senha;

	@NotNull
	@Column(name = "nivel")
	@JsonProperty("nivel")
	private Long nivel;

    @JoinColumns({@JoinColumn(name = "id_imobiliaria", referencedColumnName = "id")})
    @JsonProperty("idImobiliaria")
    @ManyToOne()
    private ImobiliariaEntity imobiliariaEntity;

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