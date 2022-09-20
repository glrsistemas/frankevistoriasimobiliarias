package br.com.frankevistorias.apifvi.uriAssets;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.atendimento.AtendimentoEntity;
import br.com.frankevistorias.apifvi.grupoImagem.GrupoImagemEntity;
import br.com.frankevistorias.apifvi.subGrupoImagem.SubGrupoImagemEntity;
import br.com.frankevistorias.apifvi.usuario.UsuarioEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetsDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonProperty("id")
	private Long id;

	@JsonProperty("formato")
	private String formato;

	@JsonProperty("uri")
	private String uri;

	@JsonProperty("idAtendimento")
	private AtendimentoEntity atendimentoEntity;

	@JsonProperty("idGrupoImagem")
	private GrupoImagemEntity grupoImagemEntity;

	@JsonProperty("idSubGrupoImagem")
	private SubGrupoImagemEntity subGrupoImagemEntity;

	public AssetsDTO(AssetsEntity assetsEntity) {

		this.id = assetsEntity.getId();
		this.uri = assetsEntity.getUri();
		this.atendimentoEntity = assetsEntity.getAtendimentoEntity();
		this.grupoImagemEntity = assetsEntity.getGrupoImagemEntity();
		this.subGrupoImagemEntity = assetsEntity.getSubGrupoImagemEntity();

	}
}
