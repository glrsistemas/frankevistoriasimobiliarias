package br.com.frankevistorias.apifvi.pleno;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/fvi")
public class PlenoController {

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/authPleno")
    public String getAuth() throws IOException, InterruptedException {
        String corpo = "sis_codigo=3&host=frankevistorias.plenoimob.com.br&usu_senha=123456&usu_email=jean_franke@hotmail.com";

        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(corpo))
                .uri(URI.create("https://api.plenoimob.com.br/api/vistoria/usuario/login"))
                .timeout(Duration.ofMinutes(3))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .build();

        HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofMinutes(3)).followRedirects(HttpClient.Redirect.NORMAL).build();

        String response = client.send(request, HttpResponse.BodyHandlers.ofString()).body();

        Map<String, Object> authJson = mapper.readValue(response, Map.class);

        Map<String, Object> getData = (Map<String, Object>) authJson.get("data");

        String token = (String) getData.get("auth_token");


        return (token);
    }
    
    @GetMapping("sincronizar_vistorias")
    public Map<String, Object> sincronizarVistorias() throws IOException, InterruptedException{

        String headerToken = "Basic " + getAuth();

        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://api.plenoimob.com.br/api/vistoria/vistoria"))
                .timeout(Duration.ofMinutes(3))
                .header("Authorization", headerToken)
                .build();

        HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofMinutes(3)).followRedirects(HttpClient.Redirect.NORMAL).build();

        String response = client.send(request, HttpResponse.BodyHandlers.ofString()).body();

        Map<String, Object> resStructure = mapper.readValue(response, Map.class);

        return resStructure;
    }

}
