package br.com.frankevistorias.apifvi.pleno;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name="plenoIntegration")
public class PlenoEntity implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long id;
	
	@Column(name = "constante")
	@JsonProperty("constante")
	private String constante;

    @Column(name = "descricao")
	@JsonProperty("descricao")
	private String descricao;
	
	@Column(name = "ativo")
	@JsonProperty("ativo")
	private Boolean ativo;
	
	@NotBlank(message = "usuario vazia")
	@Column(name = "usuario")
	@JsonProperty("usuario")
	private String usuario;
	
	@NotBlank(message = "token vazio")
	@Column(name="token")
	@JsonProperty("token")
	private String token;
	
	@NotBlank(message = "senha vazia")
	@Column(name = "senha")
	@JsonProperty("senha")
	private String senha;

	@Column(name = "dh_registro",columnDefinition="DATETIME")
	@JsonProperty("dhRegistro")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhRegistro;

	@Column(name = "dh_atualizacao",columnDefinition="DATETIME")
	@JsonProperty("dhAtualizacao")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhAtualizacao;
	
	
}
