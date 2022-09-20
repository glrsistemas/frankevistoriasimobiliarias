package br.com.frankevistorias.apifvi.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.enderecoUsuario.EnderecoUsuarioEntity;
import br.com.frankevistorias.apifvi.imobiliaria.ImobiliariaEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO implements Serializable{

    private static final long serialVersionUID = 1L;
	
	@JsonProperty("id")
	private Long	id;
	
	@JsonProperty("nome")
	private String nome;

	@JsonProperty("login")
	private String login;

	@JsonProperty("sobrenome")
	private String sobrenome;

	@JsonProperty("cpf")
	private String cpf;

	@JsonProperty("email")
	private String email;

	@JsonProperty("celular")
	private String celular;

	@JsonProperty("nivel")
	private Long nivel;

    @JsonProperty("idImobiliaria")
    private ImobiliariaEntity imobiliariaEntity;

	@JsonProperty("uri")
	private String uri;

	@JsonProperty("idEndereco")
	private EnderecoUsuarioEntity enderecoUsuarioEntity;
    public UsuarioDTO(UsuarioEntity usuarioEntity) {

        this.id                 =   usuarioEntity.getId();
        this.nome               =   usuarioEntity.getNome();
        this.sobrenome          =   usuarioEntity.getSobrenome();
		this.login				= 	usuarioEntity.getLogin();
        this.cpf                =   usuarioEntity.getCpf();
        this.email              =   usuarioEntity.getEmail();
        this.celular            =   usuarioEntity.getCelular();
        this.nivel              =   usuarioEntity.getNivel();
        this.imobiliariaEntity  =   usuarioEntity.getImobiliariaEntity();
		this.uri				=	usuarioEntity.getUri();
    }
    
}