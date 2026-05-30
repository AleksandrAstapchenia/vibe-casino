(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,669316,e=>{"use strict";let t=BigInt(0x100000000-1),o=BigInt(32);e.s(["add",0,function(e,t,o,r){let n=(t>>>0)+(r>>>0);return{h:e+o+(n/0x100000000|0)|0,l:0|n}},"add3H",0,(e,t,o,r)=>t+o+r+(e/0x100000000|0)|0,"add3L",0,(e,t,o)=>(e>>>0)+(t>>>0)+(o>>>0),"add4H",0,(e,t,o,r,n)=>t+o+r+n+(e/0x100000000|0)|0,"add4L",0,(e,t,o,r)=>(e>>>0)+(t>>>0)+(o>>>0)+(r>>>0),"add5H",0,(e,t,o,r,n,a)=>t+o+r+n+a+(e/0x100000000|0)|0,"add5L",0,(e,t,o,r,n)=>(e>>>0)+(t>>>0)+(o>>>0)+(r>>>0)+(n>>>0),"rotlBH",0,(e,t,o)=>t<<o-32|e>>>64-o,"rotlBL",0,(e,t,o)=>e<<o-32|t>>>64-o,"rotlSH",0,(e,t,o)=>e<<o|t>>>32-o,"rotlSL",0,(e,t,o)=>t<<o|e>>>32-o,"rotrBH",0,(e,t,o)=>e<<64-o|t>>>o-32,"rotrBL",0,(e,t,o)=>e>>>o-32|t<<64-o,"rotrSH",0,(e,t,o)=>e>>>o|t<<32-o,"rotrSL",0,(e,t,o)=>e<<32-o|t>>>o,"shrSH",0,(e,t,o)=>e>>>o,"shrSL",0,(e,t,o)=>e<<32-o|t>>>o,"split",0,function(e,r=!1){let n=e.length,a=new Uint32Array(n),s=new Uint32Array(n);for(let i=0;i<n;i++){let{h:n,l}=function(e,r=!1){return r?{h:Number(e&t),l:Number(e>>o&t)}:{h:0|Number(e>>o&t),l:0|Number(e&t)}}(e[i],r);[a[i],s[i]]=[n,l]}return[a,s]}])},541459,e=>{"use strict";let t="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0;function o(e){if(!Number.isSafeInteger(e)||e<0)throw Error("positive integer expected, got "+e)}function r(e,...t){if(!(e instanceof Uint8Array||ArrayBuffer.isView(e)&&"Uint8Array"===e.constructor.name))throw Error("Uint8Array expected");if(t.length>0&&!t.includes(e.length))throw Error("Uint8Array expected of length "+t+", got length="+e.length)}let n=68===new Uint8Array(new Uint32Array([0x11223344]).buffer)[0]?e=>e:function(e){for(let o=0;o<e.length;o++){var t;e[o]=(t=e[o])<<24&0xff000000|t<<8&0xff0000|t>>>8&65280|t>>>24&255}return e};function a(e){return"string"==typeof e&&(e=function(e){if("string"!=typeof e)throw Error("string expected");return new Uint8Array(new TextEncoder().encode(e))}(e)),r(e),e}e.s(["Hash",0,class{},"abytes",0,r,"aexists",0,function(e,t=!0){if(e.destroyed)throw Error("Hash instance has been destroyed");if(t&&e.finished)throw Error("Hash#digest() has already been called")},"ahash",0,function(e){if("function"!=typeof e||"function"!=typeof e.create)throw Error("Hash should be wrapped by utils.createHasher");o(e.outputLen),o(e.blockLen)},"anumber",0,o,"aoutput",0,function(e,t){r(e);let o=t.outputLen;if(e.length<o)throw Error("digestInto() expects output buffer of length at least "+o)},"clean",0,function(...e){for(let t=0;t<e.length;t++)e[t].fill(0)},"concatBytes",0,function(...e){let t=0;for(let o=0;o<e.length;o++){let n=e[o];r(n),t+=n.length}let o=new Uint8Array(t);for(let t=0,r=0;t<e.length;t++){let n=e[t];o.set(n,r),r+=n.length}return o},"createHasher",0,function(e){let t=t=>e().update(a(t)).digest(),o=e();return t.outputLen=o.outputLen,t.blockLen=o.blockLen,t.create=()=>e(),t},"createView",0,function(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)},"createXOFer",0,function(e){let t=(t,o)=>e(o).update(a(t)).digest(),o=e({});return t.outputLen=o.outputLen,t.blockLen=o.blockLen,t.create=t=>e(t),t},"randomBytes",0,function(e=32){if(t&&"function"==typeof t.getRandomValues)return t.getRandomValues(new Uint8Array(e));if(t&&"function"==typeof t.randomBytes)return Uint8Array.from(t.randomBytes(e));throw Error("crypto.getRandomValues must be defined")},"rotr",0,function(e,t){return e<<32-t|e>>>t},"swap32IfBE",0,n,"toBytes",0,a,"u32",0,function(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}],541459)},509478,e=>{"use strict";let t=BigInt(0),o=BigInt(1);function r(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&"Uint8Array"===e.constructor.name}function n(e){if(!r(e))throw Error("Uint8Array expected")}function a(e){if("string"!=typeof e)throw Error("hex string expected, got "+typeof e);return""===e?t:BigInt("0x"+e)}let s="function"==typeof Uint8Array.from([]).toHex&&"function"==typeof Uint8Array.fromHex,i=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function l(e){if(n(e),s)return e.toHex();let t="";for(let o=0;o<e.length;o++)t+=i[e[o]];return t}function c(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:void 0}function p(e){if("string"!=typeof e)throw Error("hex string expected, got "+typeof e);if(s)return Uint8Array.fromHex(e);let t=e.length,o=t/2;if(t%2)throw Error("hex string expected, got unpadded hex of length "+t);let r=new Uint8Array(o);for(let t=0,n=0;t<o;t++,n+=2){let o=c(e.charCodeAt(n)),a=c(e.charCodeAt(n+1));if(void 0===o||void 0===a)throw Error('hex string expected, got non-hex character "'+(e[n]+e[n+1])+'" at index '+n);r[t]=16*o+a}return r}function u(e,t){return p(e.toString(16).padStart(2*t,"0"))}function h(...e){let t=0;for(let o=0;o<e.length;o++){let r=e[o];n(r),t+=r.length}let o=new Uint8Array(t);for(let t=0,r=0;t<e.length;t++){let n=e[t];o.set(n,r),r+=n.length}return o}let d=e=>"bigint"==typeof e&&t<=e;function y(e,t,o){return d(e)&&d(t)&&d(o)&&t<=e&&e<o}let m=e=>new Uint8Array(e),f={bigint:e=>"bigint"==typeof e,function:e=>"function"==typeof e,boolean:e=>"boolean"==typeof e,string:e=>"string"==typeof e,stringOrUint8Array:e=>"string"==typeof e||r(e),isSafeInteger:e=>Number.isSafeInteger(e),array:e=>Array.isArray(e),field:(e,t)=>t.Fp.isValid(e),hash:e=>"function"==typeof e&&Number.isSafeInteger(e.outputLen)};e.s(["aInRange",0,function(e,t,o,r){if(!y(t,o,r))throw Error("expected valid "+e+": "+o+" <= n < "+r+", got "+t)},"abool",0,function(e,t){if("boolean"!=typeof t)throw Error(e+" boolean expected, got "+t)},"abytes",0,n,"bitLen",0,function(e){let r;for(r=0;e>t;e>>=o,r+=1);return r},"bitMask",0,e=>(o<<BigInt(e))-o,"bytesToHex",0,l,"bytesToNumberBE",0,function(e){return a(l(e))},"bytesToNumberLE",0,function(e){return n(e),a(l(Uint8Array.from(e).reverse()))},"concatBytes",0,h,"createHmacDrbg",0,function(e,t,o){if("number"!=typeof e||e<2)throw Error("hashLen must be a number");if("number"!=typeof t||t<2)throw Error("qByteLen must be a number");if("function"!=typeof o)throw Error("hmacFn must be a function");let r=m(e),n=m(e),a=0,s=()=>{r.fill(1),n.fill(0),a=0},i=(...e)=>o(n,r,...e),l=(e=m(0))=>{let t;if(n=i((t=[0],Uint8Array.from(t)),e),r=i(),0!==e.length){let t;n=i((t=[1],Uint8Array.from(t)),e),r=i()}},c=()=>{if(a++>=1e3)throw Error("drbg: tried 1000 values");let e=0,o=[];for(;e<t;){let t=(r=i()).slice();o.push(t),e+=r.length}return h(...o)};return(e,t)=>{let o;for(s(),l(e);!(o=t(c()));)l();return s(),o}},"ensureBytes",0,function(e,t,o){let n;if("string"==typeof t)try{n=p(t)}catch(t){throw Error(e+" must be hex string or Uint8Array, cause: "+t)}else if(r(t))n=Uint8Array.from(t);else throw Error(e+" must be hex string or Uint8Array");let a=n.length;if("number"==typeof o&&a!==o)throw Error(e+" of length "+o+" expected, got "+a);return n},"equalBytes",0,function(e,t){if(e.length!==t.length)return!1;let o=0;for(let r=0;r<e.length;r++)o|=e[r]^t[r];return 0===o},"hexToBytes",0,p,"inRange",0,y,"isBytes",0,r,"memoized",0,function(e){let t=new WeakMap;return(o,...r)=>{let n=t.get(o);if(void 0!==n)return n;let a=e(o,...r);return t.set(o,a),a}},"numberToBytesBE",0,u,"numberToBytesLE",0,function(e,t){return u(e,t).reverse()},"numberToHexUnpadded",0,function(e){let t=e.toString(16);return 1&t.length?"0"+t:t},"utf8ToBytes",0,function(e){if("string"!=typeof e)throw Error("string expected");return new Uint8Array(new TextEncoder().encode(e))},"validateObject",0,function(e,t,o={}){let r=(t,o,r)=>{let n=f[o];if("function"!=typeof n)throw Error("invalid validator function");let a=e[t];if((!r||void 0!==a)&&!n(a,e))throw Error("param "+String(t)+" is invalid. Expected "+o+", got "+a)};for(let[e,o]of Object.entries(t))r(e,o,!1);for(let[e,t]of Object.entries(o))r(e,t,!0);return e}])},948658,e=>{"use strict";var t=`{
  "connect_wallet": {
    "label": "Connect Wallet",
    "wrong_network": {
      "label": "Wrong network"
    }
  },

  "intro": {
    "title": "What is a Wallet?",
    "description": "A wallet is used to send, receive, store, and display digital assets. It's also a new way to log in, without needing to create new accounts and passwords on every website.",
    "digital_asset": {
      "title": "A Home for your Digital Assets",
      "description": "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."
    },
    "login": {
      "title": "A New Way to Log In",
      "description": "Instead of creating new accounts and passwords on every website, just connect your wallet."
    },
    "get": {
      "label": "Get a Wallet"
    },
    "learn_more": {
      "label": "Learn More"
    }
  },

  "sign_in": {
    "label": "Verify your account",
    "description": "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.",
    "message": {
      "send": "Sign message",
      "preparing": "Preparing message...",
      "cancel": "Cancel",
      "preparing_error": "Error preparing message, please retry!"
    },
    "signature": {
      "waiting": "Waiting for signature...",
      "verifying": "Verifying signature...",
      "signing_error": "Error signing message, please retry!",
      "verifying_error": "Error verifying signature, please retry!",
      "oops_error": "Oops, something went wrong!"
    }
  },

  "connect": {
    "label": "Connect",
    "title": "Connect a Wallet",
    "new_to_ethereum": {
      "description": "New to Ethereum wallets?",
      "learn_more": {
        "label": "Learn More"
      }
    },
    "learn_more": {
      "label": "Learn more"
    },
    "recent": "Recent",
    "status": {
      "opening": "Opening %{wallet}...",
      "connecting": "Connecting",
      "connect_mobile": "Continue in %{wallet}",
      "not_installed": "%{wallet} is not installed",
      "not_available": "%{wallet} is not available",
      "confirm": "Confirm connection in the extension",
      "confirm_mobile": "Accept connection request in the wallet"
    },
    "secondary_action": {
      "get": {
        "description": "Don't have %{wallet}?",
        "label": "GET"
      },
      "install": {
        "label": "INSTALL"
      },
      "retry": {
        "label": "RETRY"
      }
    },
    "walletconnect": {
      "description": {
        "full": "Need the official WalletConnect modal?",
        "compact": "Need the WalletConnect modal?"
      },
      "open": {
        "label": "OPEN"
      }
    }
  },

  "connect_scan": {
    "title": "Scan with %{wallet}",
    "fallback_title": "Scan with your phone"
  },

  "connector_group": {
    "installed": "Installed",
    "recommended": "Recommended",
    "other": "Other",
    "popular": "Popular",
    "more": "More",
    "others": "Others"
  },

  "get": {
    "title": "Get a Wallet",
    "action": {
      "label": "GET"
    },
    "mobile": {
      "description": "Mobile Wallet"
    },
    "extension": {
      "description": "Browser Extension"
    },
    "mobile_and_extension": {
      "description": "Mobile Wallet and Extension"
    },
    "mobile_and_desktop": {
      "description": "Mobile and Desktop Wallet"
    },
    "looking_for": {
      "title": "Not what you're looking for?",
      "mobile": {
        "description": "Select a wallet on the main screen to get started with a different wallet provider."
      },
      "desktop": {
        "compact_description": "Select a wallet on the main screen to get started with a different wallet provider.",
        "wide_description": "Select a wallet on the left to get started with a different wallet provider."
      }
    }
  },

  "get_options": {
    "title": "Get started with %{wallet}",
    "short_title": "Get %{wallet}",
    "mobile": {
      "title": "%{wallet} for Mobile",
      "description": "Use the mobile wallet to explore the world of Ethereum.",
      "download": {
        "label": "Get the app"
      }
    },
    "extension": {
      "title": "%{wallet} for %{browser}",
      "description": "Access your wallet right from your favorite web browser.",
      "download": {
        "label": "Add to %{browser}"
      }
    },
    "desktop": {
      "title": "%{wallet} for %{platform}",
      "description": "Access your wallet natively from your powerful desktop.",
      "download": {
        "label": "Add to %{platform}"
      }
    }
  },

  "get_mobile": {
    "title": "Install %{wallet}",
    "description": "Scan with your phone to download on iOS or Android",
    "continue": {
      "label": "Continue"
    }
  },

  "get_instructions": {
    "mobile": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "extension": {
      "refresh": {
        "label": "Refresh"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "desktop": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    }
  },

  "chains": {
    "title": "Switch Networks",
    "wrong_network": "Wrong network detected, switch or disconnect to continue.",
    "confirm": "Confirm in Wallet",
    "switching_not_supported": "Your wallet does not support switching networks from %{appName}. Try switching networks from within your wallet instead.",
    "switching_not_supported_fallback": "Your wallet does not support switching networks from this app. Try switching networks from within your wallet instead.",
    "disconnect": "Disconnect",
    "connected": "Connected"
  },

  "profile": {
    "disconnect": {
      "label": "Disconnect"
    },
    "copy_address": {
      "label": "Copy Address",
      "copied": "Copied!"
    },
    "explorer": {
      "label": "View more on explorer"
    },
    "transactions": {
      "description": "%{appName} transactions will appear here...",
      "description_fallback": "Your transactions will appear here...",
      "recent": {
        "title": "Recent Transactions"
      },
      "clear": {
        "label": "Clear All"
      }
    }
  },

  "wallet_connectors": {
    "ready": {
      "qr_code": {
        "step1": {
          "description": "Add Ready to your home screen for faster access to your wallet.",
          "title": "Open the Ready app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "berasig": {
      "extension": {
        "step1": {
          "title": "Install the BeraSig extension",
          "description": "We recommend pinning BeraSig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "best": {
      "qr_code": {
        "step1": {
          "title": "Open the Best Wallet app",
          "description": "Add Best Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bifrost": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bifrost Wallet on your home screen for quicker access.",
          "title": "Open the Bifrost Wallet app"
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "bitget": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bitget Wallet on your home screen for quicker access.",
          "title": "Open the Bitget Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Bitget Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitget Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitski": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitski extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitverse": {
      "qr_code": {
        "step1": {
          "title": "Open the Bitverse Wallet app",
          "description": "Add Bitverse Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bloom": {
      "desktop": {
        "step1": {
          "title": "Open the Bloom Wallet app",
          "description": "We recommend putting Bloom Wallet on your home screen for quicker access."
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.",
          "title": "Click on Connect"
        }
      }
    },

    "bybit": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bybit on your home screen for faster access to your wallet.",
          "title": "Open the Bybit app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Bybit Wallet for easy access.",
          "title": "Install the Bybit Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Bybit Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "binance": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Binance on your home screen for faster access to your wallet.",
          "title": "Open the Binance app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Binance Wallet extension",
          "description": "We recommend pinning Binance Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "coin98": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
          "title": "Open the Coin98 Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
          "title": "Install the Coin98 Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "coinbase": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coinbase Wallet on your home screen for quicker access.",
          "title": "Open the Coinbase Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Coinbase Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "compass": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Compass Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Compass Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "core": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Core on your home screen for faster access to your wallet.",
          "title": "Open the Core app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Core to your taskbar for quicker access to your wallet.",
          "title": "Install the Core extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "fox": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting FoxWallet on your home screen for quicker access.",
          "title": "Open the FoxWallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "frontier": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Frontier Wallet on your home screen for quicker access.",
          "title": "Open the Frontier Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Frontier Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "im_token": {
      "qr_code": {
        "step1": {
          "title": "Open the imToken app",
          "description": "Put imToken app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "iopay": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting ioPay on your home screen for faster access to your wallet.",
          "title": "Open the ioPay app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      }
    },

    "kaikas": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaikas to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaikas extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaikas app",
          "description": "Put Kaikas app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kaia": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaia to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaia extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaia app",
          "description": "Put Kaia app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kraken": {
      "qr_code": {
        "step1": {
          "title": "Open the Kraken Wallet app",
          "description": "Add Kraken Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "kresus": {
      "qr_code": {
        "step1": {
          "title": "Open the Kresus Wallet app",
          "description": "Add Kresus Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "magicEden": {
      "extension": {
        "step1": {
          "title": "Install the Magic Eden extension",
          "description": "We recommend pinning Magic Eden to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "metamask": {
      "qr_code": {
        "step1": {
          "title": "Open the MetaMask app",
          "description": "We recommend putting MetaMask on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the MetaMask extension",
          "description": "We recommend pinning MetaMask to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "nestwallet": {
      "extension": {
        "step1": {
          "title": "Install the NestWallet extension",
          "description": "We recommend pinning NestWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "okx": {
      "qr_code": {
        "step1": {
          "title": "Open the OKX Wallet app",
          "description": "We recommend putting OKX Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the OKX Wallet extension",
          "description": "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "omni": {
      "qr_code": {
        "step1": {
          "title": "Open the Omni app",
          "description": "Add Omni to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your home screen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "1inch": {
      "qr_code": {
        "step1": {
          "description": "Put 1inch Wallet on your home screen for faster access to your wallet.",
          "title": "Open the 1inch Wallet app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "token_pocket": {
      "qr_code": {
        "step1": {
          "title": "Open the TokenPocket app",
          "description": "We recommend putting TokenPocket on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the TokenPocket extension",
          "description": "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "trust": {
      "qr_code": {
        "step1": {
          "title": "Open the Trust Wallet app",
          "description": "Put Trust Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Trust Wallet extension",
          "description": "Click at the top right of your browser and pin Trust Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up Trust Wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "uniswap": {
      "qr_code": {
        "step1": {
          "title": "Open the Uniswap app",
          "description": "Add Uniswap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "zerion": {
      "qr_code": {
        "step1": {
          "title": "Open the Zerion app",
          "description": "We recommend putting Zerion on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Zerion extension",
          "description": "We recommend pinning Zerion to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rainbow": {
      "qr_code": {
        "step1": {
          "title": "Open the Rainbow app",
          "description": "We recommend putting Rainbow on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "You can easily backup your wallet using our backup feature on your phone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "enkrypt": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Enkrypt Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "frame": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
          "title": "Install Frame & the companion extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "one_key": {
      "extension": {
        "step1": {
          "title": "Install the OneKey Wallet extension",
          "description": "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "paraswap": {
      "qr_code": {
        "step1": {
          "title": "Open the ParaSwap app",
          "description": "Add ParaSwap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "phantom": {
      "extension": {
        "step1": {
          "title": "Install the Phantom extension",
          "description": "We recommend pinning Phantom to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rabby": {
      "extension": {
        "step1": {
          "title": "Install the Rabby extension",
          "description": "We recommend pinning Rabby to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ronin": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Ronin Wallet on your home screen for quicker access.",
          "title": "Open the Ronin Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Ronin Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Ronin Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "ramper": {
      "extension": {
        "step1": {
          "title": "Install the Ramper extension",
          "description": "We recommend pinning Ramper to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safeheron": {
      "extension": {
        "step1": {
          "title": "Install the Core extension",
          "description": "We recommend pinning Safeheron to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "taho": {
      "extension": {
        "step1": {
          "title": "Install the Taho extension",
          "description": "We recommend pinning Taho to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "wigwam": {
      "extension": {
        "step1": {
          "title": "Install the Wigwam extension",
          "description": "We recommend pinning Wigwam to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "talisman": {
      "extension": {
        "step1": {
          "title": "Install the Talisman extension",
          "description": "We recommend pinning Talisman to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import an Ethereum Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ctrl": {
      "extension": {
        "step1": {
          "title": "Install the CTRL Wallet extension",
          "description": "We recommend pinning CTRL Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "zeal": {
      "qr_code": {
        "step1": {
          "title": "Open the Zeal app",
          "description": "Add Zeal Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Zeal extension",
          "description": "We recommend pinning Zeal to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safepal": {
      "extension": {
        "step1": {
          "title": "Install the SafePal Wallet extension",
          "description": "Click at the top right of your browser and pin SafePal Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up SafePal Wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SafePal Wallet app",
          "description": "Put SafePal Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "desig": {
      "extension": {
        "step1": {
          "title": "Install the Desig extension",
          "description": "We recommend pinning Desig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "subwallet": {
      "extension": {
        "step1": {
          "title": "Install the SubWallet extension",
          "description": "We recommend pinning SubWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SubWallet app",
          "description": "We recommend putting SubWallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "clv": {
      "extension": {
        "step1": {
          "title": "Install the CLV Wallet extension",
          "description": "We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the CLV Wallet app",
          "description": "We recommend putting CLV Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "okto": {
      "qr_code": {
        "step1": {
          "title": "Open the Okto app",
          "description": "Add Okto to your home screen for quick access"
        },
        "step2": {
          "title": "Create an MPC Wallet",
          "description": "Create an account and generate a wallet"
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Tap the Scan QR icon at the top right and confirm the prompt to connect."
        }
      }
    },

    "ledger": {
      "desktop": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "Set up a new Ledger or connect to an existing one."
        },
        "step3": {
          "title": "Connect",
          "description": "A connection prompt will appear for you to connect your wallet."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "You can either sync with the desktop app or connect your Ledger."
        },
        "step3": {
          "title": "Scan the code",
          "description": "Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "valora": {
      "qr_code": {
        "step1": {
          "title": "Open the Valora app",
          "description": "We recommend putting Valora on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "gate": {
      "qr_code": {
        "step1": {
          "title": "Open the Gate app",
          "description": "We recommend putting Gate on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Gate extension",
          "description": "We recommend pinning Gate to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "gemini": {
      "qr_code": {
        "step1": {
          "title": "Open keys.gemini.com",
          "description": "Visit keys.gemini.com on your mobile browser - no app download required."
        },
        "step2": {
          "title": "Create Your Wallet Instantly",
          "description": "Set up your smart wallet in seconds using your device's built-in authentication."
        },
        "step3": {
          "title": "Scan to Connect",
          "description": "Scan the QR code to instantly connect your wallet - it just works."
        }
      },
      "extension": {
        "step1": {
          "title": "Go to keys.gemini.com",
          "description": "No extensions or downloads needed - your wallet lives securely in the browser."
        },
        "step2": {
          "title": "One-Click Setup",
          "description": "Create your smart wallet instantly with passkey authentication - easier than any wallet out there."
        },
        "step3": {
          "title": "Connect and Go",
          "description": "Approve the connection and you're ready - the unopinionated wallet that just works."
        }
      }
    },

    "xportal": {
      "qr_code": {
        "step1": {
          "description": "Put xPortal on your home screen for faster access to your wallet.",
          "title": "Open the xPortal app"
        },
        "step2": {
          "description": "Create a wallet or import an existing one.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "mew": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting MEW Wallet on your home screen for quicker access.",
          "title": "Open the MEW Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "zilpay": {
      "qr_code": {
        "step1": {
          "title": "Open the ZilPay app",
          "description": "Add ZilPay to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "nova": {
      "qr_code": {
        "step1": {
          "title": "Open the Nova Wallet app",
          "description": "Add Nova Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "meco": {
      "qr_code": {
        "step1": {
          "title": "Open the MeCo Wallet app",
          "description": "Put MeCo Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "anchorage_digital": {
      "extension": {
        "step1": {
          "title": "Install the Anchorage Digital extension",
          "description": "We recommend pinning Anchorage Digital to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Scan the QR code to login",
          "description": "Securely connect your organization's wallets to dApps with institutional-grade security."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you log in, click below to refresh the browser and load up the extension."
        }
      }
    }
  }
}
`;e.s(["en_US_default",0,t])},287479,e=>{"use strict";let t=(0,e.i(593750).defineChain)({id:0xaa36a7,name:"Sepolia",nativeCurrency:{name:"Sepolia Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://11155111.rpc.thirdweb.com"]}},blockExplorers:{default:{name:"Etherscan",url:"https://sepolia.etherscan.io",apiUrl:"https://api-sepolia.etherscan.io/api"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:751532},ensUniversalResolver:{address:"0xeeeeeeee14d718c2b47d9923deab1335e144eeee",blockCreated:8928790}},testnet:!0});e.s(["sepolia",0,t])},327592,e=>{"use strict";var t=e.i(848277),o=e.i(568160),r=e.i(228997),n=e.i(947206),a=e.i(310488),s=class extends a.Subscribable{constructor(e={}){super(),this.config=e,this.#e=new Map}#e;build(e,t,n){let a=t.queryKey,s=t.queryHash??(0,o.hashQueryKeyByOptions)(a,t),i=this.get(s);return i||(i=new r.Query({client:e,queryKey:a,queryHash:s,options:e.defaultQueryOptions(t),state:n,defaultOptions:e.getQueryDefaults(a)}),this.add(i)),i}add(e){this.#e.has(e.queryHash)||(this.#e.set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){let t=this.#e.get(e.queryHash);t&&(e.destroy(),t===e&&this.#e.delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){n.notifyManager.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return this.#e.get(e)}getAll(){return[...this.#e.values()]}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,o.matchQuery)(t,e))}findAll(e={}){let t=this.getAll();return Object.keys(e).length>0?t.filter(t=>(0,o.matchQuery)(e,t)):t}notify(e){n.notifyManager.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){n.notifyManager.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){n.notifyManager.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}},i=e.i(503930),l=a,c=class extends l.Subscribable{constructor(e={}){super(),this.config=e,this.#t=new Set,this.#o=new Map,this.#r=0}#t;#o;#r;build(e,t,o){let r=new i.Mutation({client:e,mutationCache:this,mutationId:++this.#r,options:e.defaultMutationOptions(t),state:o});return this.add(r),r}add(e){this.#t.add(e);let t=p(e);if("string"==typeof t){let o=this.#o.get(t);o?o.push(e):this.#o.set(t,[e])}this.notify({type:"added",mutation:e})}remove(e){if(this.#t.delete(e)){let t=p(e);if("string"==typeof t){let o=this.#o.get(t);if(o)if(o.length>1){let t=o.indexOf(e);-1!==t&&o.splice(t,1)}else o[0]===e&&this.#o.delete(t)}}this.notify({type:"removed",mutation:e})}canRun(e){let t=p(e);if("string"!=typeof t)return!0;{let o=this.#o.get(t),r=o?.find(e=>"pending"===e.state.status);return!r||r===e}}runNext(e){let t=p(e);if("string"!=typeof t)return Promise.resolve();{let o=this.#o.get(t)?.find(t=>t!==e&&t.state.isPaused);return o?.continue()??Promise.resolve()}}clear(){n.notifyManager.batch(()=>{this.#t.forEach(e=>{this.notify({type:"removed",mutation:e})}),this.#t.clear(),this.#o.clear()})}getAll(){return Array.from(this.#t)}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,o.matchMutation)(t,e))}findAll(e={}){return this.getAll().filter(t=>(0,o.matchMutation)(e,t))}notify(e){n.notifyManager.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){let e=this.getAll().filter(e=>e.state.isPaused);return n.notifyManager.batch(()=>Promise.all(e.map(e=>e.continue().catch(o.noop))))}};function p(e){return e.options.scope?.id}var u=e.i(266849),h=e.i(240285),d=class{#n;#a;#s;#i;#l;#c;#p;#u;constructor(e={}){this.#n=e.queryCache||new s,this.#a=e.mutationCache||new c,this.#s=e.defaultOptions||{},this.#i=new Map,this.#l=new Map,this.#c=0}mount(){this.#c++,1===this.#c&&(this.#p=u.focusManager.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#n.onFocus())}),this.#u=h.onlineManager.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#n.onOnline())}))}unmount(){this.#c--,0===this.#c&&(this.#p?.(),this.#p=void 0,this.#u?.(),this.#u=void 0)}isFetching(e){return this.#n.findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return this.#a.findAll({...e,status:"pending"}).length}getQueryData(e){let t=this.defaultQueryOptions({queryKey:e});return this.#n.get(t.queryHash)?.state.data}ensureQueryData(e){let t=this.defaultQueryOptions(e),r=this.#n.build(this,t),n=r.state.data;return void 0===n?this.fetchQuery(e):(e.revalidateIfStale&&r.isStaleByTime((0,o.resolveStaleTime)(t.staleTime,r))&&this.prefetchQuery(t),Promise.resolve(n))}getQueriesData(e){return this.#n.findAll(e).map(({queryKey:e,state:t})=>[e,t.data])}setQueryData(e,t,r){let n=this.defaultQueryOptions({queryKey:e}),a=this.#n.get(n.queryHash),s=a?.state.data,i=(0,o.functionalUpdate)(t,s);if(void 0!==i)return this.#n.build(this,n).setData(i,{...r,manual:!0})}setQueriesData(e,t,o){return n.notifyManager.batch(()=>this.#n.findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,o)]))}getQueryState(e){let t=this.defaultQueryOptions({queryKey:e});return this.#n.get(t.queryHash)?.state}removeQueries(e){let t=this.#n;n.notifyManager.batch(()=>{t.findAll(e).forEach(e=>{t.remove(e)})})}resetQueries(e,t){let o=this.#n;return n.notifyManager.batch(()=>(o.findAll(e).forEach(e=>{e.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){let r={revert:!0,...t};return Promise.all(n.notifyManager.batch(()=>this.#n.findAll(e).map(e=>e.cancel(r)))).then(o.noop).catch(o.noop)}invalidateQueries(e,t={}){return n.notifyManager.batch(()=>(this.#n.findAll(e).forEach(e=>{e.invalidate()}),e?.refetchType==="none")?Promise.resolve():this.refetchQueries({...e,type:e?.refetchType??e?.type??"active"},t))}refetchQueries(e,t={}){let r={...t,cancelRefetch:t.cancelRefetch??!0};return Promise.all(n.notifyManager.batch(()=>this.#n.findAll(e).filter(e=>!e.isDisabled()&&!e.isStatic()).map(e=>{let t=e.fetch(void 0,r);return r.throwOnError||(t=t.catch(o.noop)),"paused"===e.state.fetchStatus?Promise.resolve():t}))).then(o.noop)}fetchQuery(e){let t=this.defaultQueryOptions(e);void 0===t.retry&&(t.retry=!1);let r=this.#n.build(this,t);return r.isStaleByTime((0,o.resolveStaleTime)(t.staleTime,r))?r.fetch(t):Promise.resolve(r.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(o.noop).catch(o.noop)}fetchInfiniteQuery(e){return e._type="infinite",this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(o.noop).catch(o.noop)}ensureInfiniteQueryData(e){return e._type="infinite",this.ensureQueryData(e)}resumePausedMutations(){return h.onlineManager.isOnline()?this.#a.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#n}getMutationCache(){return this.#a}getDefaultOptions(){return this.#s}setDefaultOptions(e){this.#s=e}setQueryDefaults(e,t){this.#i.set((0,o.hashKey)(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){let t=[...this.#i.values()],r={};return t.forEach(t=>{(0,o.partialMatchKey)(e,t.queryKey)&&Object.assign(r,t.defaultOptions)}),r}setMutationDefaults(e,t){this.#l.set((0,o.hashKey)(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){let t=[...this.#l.values()],r={};return t.forEach(t=>{(0,o.partialMatchKey)(e,t.mutationKey)&&Object.assign(r,t.defaultOptions)}),r}defaultQueryOptions(e){if(e._defaulted)return e;let t={...this.#s.queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=(0,o.hashQueryKeyByOptions)(t.queryKey,t)),void 0===t.refetchOnReconnect&&(t.refetchOnReconnect="always"!==t.networkMode),void 0===t.throwOnError&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===o.skipToken&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...this.#s.mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){this.#n.clear(),this.#a.clear()}},y=e.i(746592),m=e.i(147463),f=e.i(562501),w=e.i(499746),b=e.i(330668);e.i(639057);var g=e.i(287479);let k=(0,m.getDefaultConfig)({appName:"Vibe Casino",projectId:"c4f8b2e1d7a9460f9b3e2c1d8a7f6e5b",chains:[g.sepolia],ssr:!0});e.s(["Providers",0,function({children:e}){let[o]=(0,b.useState)(()=>new d);return(0,t.jsx)(w.WagmiProvider,{config:k,children:(0,t.jsx)(y.QueryClientProvider,{client:o,children:(0,t.jsx)(m.RainbowKitProvider,{theme:(0,f.darkTheme)({accentColor:"#fbbf24",accentColorForeground:"#0a0a0f",borderRadius:"large"}),children:e})})})}],327592)},994059,e=>{e.v(t=>Promise.all(["static/chunks/10.t28y__tftm.js"].map(t=>e.l(t))).then(()=>t(31279)))},591795,e=>{e.v(e=>Promise.resolve().then(()=>e(118006)))},515944,e=>{e.v(t=>Promise.all(["static/chunks/0gaj4ya-vl.pr.js","static/chunks/080rl~1-lo.ny.js","static/chunks/0g1iel4anrl4g.js"].map(t=>e.l(t))).then(()=>t(66661)))},720474,e=>{e.v(t=>Promise.all(["static/chunks/15sxw1joy7a24.js","static/chunks/09s-no-fv2c-d.js"].map(t=>e.l(t))).then(()=>t(915550)))},221289,e=>{e.v(t=>Promise.all(["static/chunks/12dp9hoes2f16.js"].map(t=>e.l(t))).then(()=>t(577316)))},65645,e=>{e.v(t=>Promise.all(["static/chunks/11tzdcg7vmzlg.js"].map(t=>e.l(t))).then(()=>t(429844)))},25246,e=>{e.v(t=>Promise.all(["static/chunks/0-z8.3~t938t2.js","static/chunks/00eloquh0._z-.js"].map(t=>e.l(t))).then(()=>t(260099)))},765251,e=>{e.v(t=>Promise.all(["static/chunks/0gb..pvji0-he.js"].map(t=>e.l(t))).then(()=>t(823108)))},310427,e=>{e.v(t=>Promise.all(["static/chunks/1622qt5bwso1l.js"].map(t=>e.l(t))).then(()=>t(733590)))},219796,e=>{e.v(t=>Promise.all(["static/chunks/0cv5.jahmlyoe.js"].map(t=>e.l(t))).then(()=>t(12389)))},380217,e=>{e.v(t=>Promise.all(["static/chunks/10e_oygmc-r.4.js"].map(t=>e.l(t))).then(()=>t(531451)))},268628,e=>{e.v(t=>Promise.all(["static/chunks/0fk1o4h2vuk.m.js"].map(t=>e.l(t))).then(()=>t(73889)))},205158,e=>{e.v(t=>Promise.all(["static/chunks/024ti.y84m7ys.js"].map(t=>e.l(t))).then(()=>t(261262)))},909058,e=>{e.v(t=>Promise.all(["static/chunks/0d~l.r_bp0igf.js"].map(t=>e.l(t))).then(()=>t(340791)))},66300,e=>{e.v(t=>Promise.all(["static/chunks/0gvuk54gpy9fs.js"].map(t=>e.l(t))).then(()=>t(439178)))},643136,e=>{e.v(t=>Promise.all(["static/chunks/0vjr7gvjljjbe.js"].map(t=>e.l(t))).then(()=>t(208687)))},316230,e=>{e.v(t=>Promise.all(["static/chunks/0k-h-ufw23las.js"].map(t=>e.l(t))).then(()=>t(343920)))},920408,e=>{e.v(t=>Promise.all(["static/chunks/13wouf6tv3m1i.js"].map(t=>e.l(t))).then(()=>t(731561)))},158561,e=>{e.v(t=>Promise.all(["static/chunks/16i747lrz8yf0.js"].map(t=>e.l(t))).then(()=>t(847110)))},922897,e=>{e.v(t=>Promise.all(["static/chunks/131l5bd97bpfi.js"].map(t=>e.l(t))).then(()=>t(279692)))},138582,e=>{e.v(t=>Promise.all(["static/chunks/0owwjnoge9w3a.js"].map(t=>e.l(t))).then(()=>t(928112)))},261237,e=>{e.v(t=>Promise.all(["static/chunks/182-8m0id.l1y.js"].map(t=>e.l(t))).then(()=>t(641602)))},800081,e=>{e.v(t=>Promise.all(["static/chunks/0hijd7hhjyxc6.js"].map(t=>e.l(t))).then(()=>t(990875)))},569579,e=>{e.v(t=>Promise.all(["static/chunks/0kaq8ie49v6tm.js"].map(t=>e.l(t))).then(()=>t(149384)))},534801,e=>{e.v(t=>Promise.all(["static/chunks/08b46s6utln0h.js"].map(t=>e.l(t))).then(()=>t(358563)))},197135,e=>{e.v(t=>Promise.all(["static/chunks/0.j-0w9w9rnlm.js"].map(t=>e.l(t))).then(()=>t(402261)))},66215,e=>{e.v(t=>Promise.all(["static/chunks/08hx07hz8c.pq.js"].map(t=>e.l(t))).then(()=>t(723813)))},578166,e=>{e.v(t=>Promise.all(["static/chunks/066755~61em7l.js"].map(t=>e.l(t))).then(()=>t(839104)))},812812,e=>{e.v(t=>Promise.all(["static/chunks/0_408_jnbm.ni.js"].map(t=>e.l(t))).then(()=>t(903451)))},563476,e=>{e.v(t=>Promise.all(["static/chunks/03lxh._xwvhd..js"].map(t=>e.l(t))).then(()=>t(581310)))},955578,e=>{e.v(t=>Promise.all(["static/chunks/0vkjw9rhszui2.js"].map(t=>e.l(t))).then(()=>t(186039)))},902193,e=>{e.v(t=>Promise.all(["static/chunks/09rbvbmzadn1v.js"].map(t=>e.l(t))).then(()=>t(967769)))},498027,e=>{e.v(t=>Promise.all(["static/chunks/0ck~m0gawjuc5.js"].map(t=>e.l(t))).then(()=>t(45186)))},1887,e=>{e.v(t=>Promise.all(["static/chunks/0us4x1f90_cnu.js"].map(t=>e.l(t))).then(()=>t(507792)))},543394,e=>{e.v(t=>Promise.all(["static/chunks/03n4arj_ew7ee.js"].map(t=>e.l(t))).then(()=>t(452489)))},660067,e=>{e.v(t=>Promise.all(["static/chunks/00i-3y42eny5w.js"].map(t=>e.l(t))).then(()=>t(169202)))},528458,e=>{e.v(t=>Promise.all(["static/chunks/0ltzvbtvi1ugg.js"].map(t=>e.l(t))).then(()=>t(33768)))},140226,e=>{e.v(t=>Promise.all(["static/chunks/0oq3xykytorio.js"].map(t=>e.l(t))).then(()=>t(889324)))},264312,e=>{e.v(t=>Promise.all(["static/chunks/050il68rbvvvz.js"].map(t=>e.l(t))).then(()=>t(258678)))},633176,e=>{e.v(t=>Promise.all(["static/chunks/15q149pp53n7e.js"].map(t=>e.l(t))).then(()=>t(925121)))},708824,e=>{e.v(t=>Promise.all(["static/chunks/0_50gw2nsnhaq.js"].map(t=>e.l(t))).then(()=>t(974018)))},528251,e=>{e.v(t=>Promise.all(["static/chunks/0fru2ipm8hy1p.js"].map(t=>e.l(t))).then(()=>t(298931)))},543376,e=>{e.v(t=>Promise.all(["static/chunks/0bl38t7e~ijvv.js"].map(t=>e.l(t))).then(()=>t(311369)))},944374,e=>{e.v(t=>Promise.all(["static/chunks/17e042ujaqvfa.js"].map(t=>e.l(t))).then(()=>t(573746)))},253030,e=>{e.v(t=>Promise.all(["static/chunks/0kqvg1uf3qnga.js"].map(t=>e.l(t))).then(()=>t(895011)))},817554,e=>{e.v(t=>Promise.all(["static/chunks/0nd0ha2ug.b79.js"].map(t=>e.l(t))).then(()=>t(593397)))},82678,e=>{e.v(t=>Promise.all(["static/chunks/11537jixmxqb..js"].map(t=>e.l(t))).then(()=>t(368670)))},895544,e=>{e.v(t=>Promise.all(["static/chunks/06te3vph-4chh.js"].map(t=>e.l(t))).then(()=>t(183317)))},920455,e=>{e.v(t=>Promise.all(["static/chunks/0e4wg-vrjt9_d.js"].map(t=>e.l(t))).then(()=>t(887971)))},75586,e=>{e.v(t=>Promise.all(["static/chunks/0gqcrvbcdj7gt.js"].map(t=>e.l(t))).then(()=>t(723)))},242398,e=>{e.v(t=>Promise.all(["static/chunks/0j-zjfihf9v_k.js"].map(t=>e.l(t))).then(()=>t(733123)))},91910,e=>{e.v(t=>Promise.all(["static/chunks/0ky~glazvsy_b.js"].map(t=>e.l(t))).then(()=>t(223642)))},560859,e=>{e.v(t=>Promise.all(["static/chunks/0mk-t-_oxfzyk.js"].map(t=>e.l(t))).then(()=>t(83578)))},865914,e=>{e.v(t=>Promise.all(["static/chunks/00dzf.a84at--.js"].map(t=>e.l(t))).then(()=>t(131742)))},214714,e=>{e.v(t=>Promise.all(["static/chunks/0ghs9eftladgn.js"].map(t=>e.l(t))).then(()=>t(577764)))},266986,e=>{e.v(t=>Promise.all(["static/chunks/0dsy~zpm6-7w8.js"].map(t=>e.l(t))).then(()=>t(488935)))},765443,e=>{e.v(t=>Promise.all(["static/chunks/03kjt~augxmtj.js"].map(t=>e.l(t))).then(()=>t(509323)))},743340,e=>{e.v(t=>Promise.all(["static/chunks/0~u-tmr~oqay9.js"].map(t=>e.l(t))).then(()=>t(606638)))},11240,e=>{e.v(t=>Promise.all(["static/chunks/0rwg-czkhqibe.js"].map(t=>e.l(t))).then(()=>t(774809)))},371804,e=>{e.v(t=>Promise.all(["static/chunks/0kwkpj-jcelgb.js"].map(t=>e.l(t))).then(()=>t(430706)))},353605,e=>{e.v(t=>Promise.all(["static/chunks/0gc-hrseur77q.js"].map(t=>e.l(t))).then(()=>t(135880)))},797161,e=>{e.v(t=>Promise.all(["static/chunks/0j~si_xrx4gg9.js"].map(t=>e.l(t))).then(()=>t(882889)))},713377,e=>{e.v(t=>Promise.all(["static/chunks/0b1kovemo24av.js"].map(t=>e.l(t))).then(()=>t(286374)))},859961,e=>{e.v(t=>Promise.all(["static/chunks/0h22y6edbk-se.js"].map(t=>e.l(t))).then(()=>t(287955)))},965806,e=>{e.v(t=>Promise.all(["static/chunks/15vpdg5hd9_za.js"].map(t=>e.l(t))).then(()=>t(303513)))},933010,e=>{e.v(t=>Promise.all(["static/chunks/0.fzo5ew-ctvp.js"].map(t=>e.l(t))).then(()=>t(184077)))},856280,e=>{e.v(t=>Promise.all(["static/chunks/08t.-1g7c.463.js"].map(t=>e.l(t))).then(()=>t(966668)))},756328,e=>{e.v(t=>Promise.all(["static/chunks/0hk6paxel7yqk.js"].map(t=>e.l(t))).then(()=>t(538737)))},224388,e=>{e.v(t=>Promise.all(["static/chunks/0gt~~fp6zev08.js"].map(t=>e.l(t))).then(()=>t(971856)))},826070,e=>{e.v(t=>Promise.all(["static/chunks/0u6uphegzzzl3.js"].map(t=>e.l(t))).then(()=>t(76409)))},632879,e=>{e.v(t=>Promise.all(["static/chunks/0oi3g39ggt5f~.js"].map(t=>e.l(t))).then(()=>t(232918)))},779439,e=>{e.v(t=>Promise.all(["static/chunks/13aou~g_zbkc8.js"].map(t=>e.l(t))).then(()=>t(718578)))},108326,e=>{e.v(t=>Promise.all(["static/chunks/0yax8gox20j-6.js"].map(t=>e.l(t))).then(()=>t(506340)))},435206,e=>{e.v(t=>Promise.all(["static/chunks/0zfh3d36ht4p3.js"].map(t=>e.l(t))).then(()=>t(3718)))},89859,e=>{e.v(t=>Promise.all(["static/chunks/08_jga0y_pwjo.js"].map(t=>e.l(t))).then(()=>t(781182)))},176442,e=>{e.v(t=>Promise.all(["static/chunks/0bm8bqfipk4a1.js"].map(t=>e.l(t))).then(()=>t(491728)))},450543,e=>{e.v(t=>Promise.all(["static/chunks/0u17c_zf8f6r~.js"].map(t=>e.l(t))).then(()=>t(880021)))},484859,e=>{e.v(t=>Promise.all(["static/chunks/13ojtkil96sik.js"].map(t=>e.l(t))).then(()=>t(832276)))},925686,e=>{e.v(t=>Promise.all(["static/chunks/0orl4b1_ae5ts.js"].map(t=>e.l(t))).then(()=>t(437077)))},40498,e=>{e.v(t=>Promise.all(["static/chunks/0.d9z3o_qmere.js"].map(t=>e.l(t))).then(()=>t(635430)))},289006,e=>{e.v(t=>Promise.all(["static/chunks/00p4uz30trqqe.js"].map(t=>e.l(t))).then(()=>t(274074)))},298530,e=>{e.v(t=>Promise.all(["static/chunks/0naub_z.jxjr-.js"].map(t=>e.l(t))).then(()=>t(958348)))}]);