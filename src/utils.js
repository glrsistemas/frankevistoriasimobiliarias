import {Alert, Snackbar, AlertTitle} from "@mui/material";

function open(ev){
    return ev;
}

let utils = {
  clearUserData: function () {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  getBaseUrl: function () {
    let protocol = "";

    let domain = window.location.hostname;

    console.log(domain);

    if (window.location.protocol === "https:") {
      protocol = "https://";
    } else {
      protocol = "http://";
    }

    if (domain.indexOf("localhost") >= 0 || domain.indexOf("127.0.0.1") >= 0) {
      return protocol + "localhost:8080/";
    } else if (domain.indexOf("frankevistorias.com.br") >= 0) {
      return protocol + "apifvi.azurewebsites.net/";
    }
  },
  todasImobcapitalizeAll: function (str, lower = true) {
    return (lower ? str.toLowerCase() : str).replace(
      /(?:^|\s|["'([{])+\S/g,
      (match) => match.toUpperCase()
    );
  },
  setCookie: function (name, value, days) {
    let expires = "";

    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  toJson: function (v) {
    if (v) {
      if (typeof v === "string") {
        try {
          return JSON.parse(v);
        } catch (error) {}
      }

      if (typeof v === "object") {
        return v;
      }
    }
    return {};
  },
  getMonth: function (d) {
    if (!d) {
        d = new Date();
    }

    let k = 'month_' + d.getMonth();
    let dc = {};

    dc.month_0 = 'Janeiro';
    dc.month_1 = 'Fevereiro';
    dc.month_2 = 'Março';
    dc.month_3 = 'Abril';
    dc.month_4 = 'Maio';
    dc.month_5 = 'Junho';
    dc.month_6 = 'Julho';
    dc.month_7 = 'Agosto';
    dc.month_8 = 'Setembro';
    dc.month_9 = 'Outubro';
    dc.month_10 = 'Novembro';
    dc.month_11 = 'Dezembro';

    return dc[k] + ' de ' + d.getFullYear();
},
isCurrentDate: function (a, b) {
    return a === b;
},
dateToString: function (v, format) {
    if (typeof v === 'string') {
        v = utils.toDate(v);
    }

    if (v) {
        return v.getDateString(format);
    }
    return null;
},
response: function (title, msg,strong,type, color){

return(<Snackbar
          open={open(true)}
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          autoHideDuration={2000}
          onClose={() => {
            open(false);
          }}
        >
          <Alert severity='type' variant="filled" onClose={() => {
            open(false);
          }}>
            <AlertTitle>{title}</AlertTitle>
                  {msg}
            <strong>{strong ? strong : ''}</strong>
          </Alert>
        </Snackbar>)
},
toDate: function (v) {
    if (v != null) {
        try {
            if (typeof v === 'string') {
                let parts = [];
                let hh = 0;
                let mm = 0;
                let ss = 0;
                let dia = 0;
                let ano = 0;
                let aux = [];

                if (v.indexOf('T') > 0 || v.indexOf('+') > 0) {
                    return new Date(v);
                } else if (v.indexOf('-') > 0) {
                    return new Date(v);
                } else {
                    aux = v.split(' ');
                    parts = aux[0].split('/');
                    ano = parts[2];
                    dia = parts[0];
                }

                if (aux.length > 1) {
                    let hours = aux[1].split(':');

                    hh = parseInt(hours[0]);
                    mm = parseInt(hours[1]);

                    if (hours.length > 2) {
                        ss = parseInt(hours[2]);
                    }
                }

                let mes = parseInt(parts[1]);

                return new Date(ano, mes - 1, dia, hh, mm, ss);
            }
        } catch (error) {

        }
    }
    return null;
},
contains: function (query, str, separator) {
    if (!query || !str) {
        return false;
    }
    if (!separator) {
        separator = '|';
    }
    if (str.indexOf(separator) < 0) {
        str = separator + str + separator;
    }
    return query.indexOf(str) >= 0;
}, 
escapeHtml: function (unsf) {
    return unsf
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
},
noHtml: function (p1) {
    return p1.replace(/<[^>]*>?/gm, '');
},
isEmpty: function (v) {
    if (typeof v === 'undefined' || v === null) {
        return true;
    }

    const x = (v + '').trim();

    return x === '';
},
nvl: function (...args) {
    for (const i in args) {
        if (typeof args[i] !== 'undefined' && args[i] !== null) {
            return args[i];
        }
    }
    return null;
},
};


export default utils;