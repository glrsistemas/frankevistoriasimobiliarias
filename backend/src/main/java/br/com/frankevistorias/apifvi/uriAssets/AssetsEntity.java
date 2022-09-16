package br.com.frankevistorias.apifvi.uriAssets;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.atendimento.AtendimentoEntity;
import br.com.frankevistorias.apifvi.usuario.UsuarioEntity;
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
@Table(name="assets")
public class AssetsEntity implements Serializable{

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long	id;

    @NotBlank(message="uri vazio")
	@Column(name = "uri")
	@JsonProperty("uri")
	private String uri;
    
	@NotBlank(message="formato vazio")
	@Column(name = "formato")
	@JsonProperty("formato")
	private String formato;

	@JoinColumns({@JoinColumn(name = "id_usuario", referencedColumnName = "id")})
    @JsonProperty("idUsuario")
    @ManyToOne()
    private UsuarioEntity usuarioEntity;

	@JoinColumns({@JoinColumn(name = "id_atendimento", referencedColumnName = "id")})
    @JsonProperty("idAtendimento")
    @ManyToOne()
    private AtendimentoEntity atendimentoEntity;

	@Column(name = "dh_registro",columnDefinition="DATETIME")
	@JsonProperty("dhRegistro")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhRegistro;

	@Column(name = "dh_atualizacao",columnDefinition="DATETIME")
	@JsonProperty("dhAtualizacao")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhAtualizacao;
}