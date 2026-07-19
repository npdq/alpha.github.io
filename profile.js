/*
  762.lol profile page
  ---------------------
  Loads /users/<username>.json and renders it.
  Routing: query ?user=<name> OR pathname (e.g. /tudor).
*/

const SOCIAL_ICONS = {
  discord: '<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.3 10.3 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.245.198.372.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.893.077.077 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  spotify: '<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12A12 12 0 0 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.56.3z"/></svg>',
  roblox: '<svg viewBox="0 0 24 24"><path d="M5.184 1.125 1.125 18.81l17.69 4.065 4.06-17.684zm9.912 13.373-4.95-1.136 1.14-4.945 4.95 1.135z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  lastfm: '<svg viewBox="0 0 24 24"><path d="M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.591 3.381-4.591 2.42 0 3.189 1.567 3.849 3.574l.88 2.749c.88 2.666 2.529 4.81 7.285 4.81 3.409 0 5.718-1.044 5.718-3.793 0-2.227-1.265-3.381-3.63-3.931l-1.758-.385c-1.21-.274-1.567-.77-1.567-1.594 0-.935.742-1.485 1.952-1.485 1.32 0 2.034.495 2.144 1.677l2.749-.33c-.22-2.474-1.925-3.492-4.729-3.492-2.474 0-4.893.935-4.893 3.932 0 1.87 1.238 3.053 2.89 3.443l1.87.44c1.402.33 1.87.907 1.87 1.677 0 .99-.963 1.402-2.776 1.402-2.694 0-3.82-1.402-4.453-3.299l-.907-2.749c-1.155-3.574-2.996-4.893-6.653-4.893C2.227 5.295 0 7.824 0 12.112 0 16.235 2.118 18.49 5.8 18.49c2.97 0 4.4-1.402 4.784-1.87z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>',
  bitcoin: '<svg viewBox="0 0 24 24"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.545-2.19c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  twitch: '<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
  soundcloud: '<svg viewBox="0 0 24 24"><path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.41 3.169h-8.16a.68.68 0 0 1-.675-.683V7.862a.75.75 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.578-.124.88-.124.822 0 1.596.323 2.18.904A3.049 3.049 0 0 1 24 13.993l-.001.172zM10.637 7.24a4.993 4.993 0 0 1 .35-.092l.013 9.799a.469.469 0 0 1-.468.464H9.04a.47.47 0 0 1-.47-.464V7.389c.59-.106 1.394-.12 2.067-.15zm-3.024.606v9.113a.37.37 0 0 1-.37.371h-.785a.37.37 0 0 1-.37-.371V7.852c.457-.085.95-.053 1.525-.006zM4.85 9.317l.015 6.942a.275.275 0 0 1-.275.275h-.692a.275.275 0 0 1-.275-.275L3.6 9.395c.44-.098.81-.13 1.25-.078zM1.883 11.56c.221-.017.434-.013.638.012.039 1.522.04 3.015 0 4.5-.203.024-.416.028-.637.012a.19.19 0 0 1-.187-.191v-4.142a.19.19 0 0 1 .186-.191zM0 13.223a.163.163 0 0 1 .15-.163c.132-.016.266-.008.4.017v2.25a2.24 2.24 0 0 1-.4.017.163.163 0 0 1-.15-.163z"/></svg>',
  reddit: '<svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
  snapchat: '<svg viewBox="0 0 24 24"><path d="M12.166.066c.317 0 3.806.095 5.457 3.792.545 1.219.409 3.288.3 4.95l-.003.048c-.011.17-.022.336-.033.506.05.03.184.09.41.09.299-.02.648-.121.997-.298.15-.077.315-.117.485-.118.239 0 .478.075.648.212.258.187.409.467.409.776 0 .388-.239.724-.718 1.015-.09.05-.309.149-.578.258-.348.139-.856.358-.995.677-.06.16-.03.378.09.656 0 .01.01.02.01.03.04.1 1.147 2.588 3.597 2.987.22.04.38.229.37.449.002.058-.008.116-.03.17-.308.719-1.625 1.247-4.015 1.625-.08.139-.17.568-.22.817-.04.178-.09.357-.149.546-.07.258-.249.357-.558.357h-.04c-.138 0-.337-.03-.596-.09-.338-.069-.667-.099-1.025-.099-.21 0-.429.01-.648.05-.448.069-.826.328-1.263.627-.618.409-1.325.877-2.379.877l-.09-.002h-.08c-1.055 0-1.762-.468-2.39-.875-.429-.29-.807-.548-1.255-.628a3.93 3.93 0 0 0-.648-.05c-.368 0-.657.049-.976.118-.249.06-.438.09-.587.09-.368 0-.498-.22-.548-.358-.06-.198-.11-.378-.159-.548-.069-.3-.149-.648-.219-.797-2.449-.378-3.766-.906-4.076-1.625-.02-.05-.03-.1-.029-.17-.01-.22.148-.408.367-.448 2.45-.4 3.557-2.878 3.598-2.987.009-.01.009-.02.008-.03.12-.279.15-.498.09-.657-.13-.31-.638-.529-.995-.678a8.13 8.13 0 0 1-.578-.258c-.518-.308-.725-.647-.724-1.015 0-.417.289-.737.699-.917.17-.08.36-.12.548-.12.14 0 .269.03.388.08.378.188.747.289 1.045.289.239 0 .409-.06.499-.11l-.05-.637v-.015c-.11-1.661-.247-3.73.3-4.95C8.337.16 11.835.072 12.147.072c.029-.006.01-.006.019-.006z"/></svg>',
  steam: '<svg viewBox="0 0 24 24"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.794-.076 3.332-1.375.261-.63.264-1.325.005-1.955s-.75-1.12-1.377-1.38c-.624-.26-1.29-.249-1.878-.03l1.523.63c.96.4 1.411 1.5 1.009 2.455-.397.957-1.497 1.41-2.455 1.014zM17.032 11.88c-1.663 0-3.015-1.353-3.015-3.015 0-1.665 1.352-3.015 3.015-3.015 1.665 0 3.015 1.35 3.015 3.015 0 1.662-1.35 3.015-3.015 3.015zm-2.258-3.02c0-1.249 1.013-2.264 2.265-2.264 1.25 0 2.266 1.015 2.266 2.264 0 1.251-1.016 2.263-2.266 2.263-1.252 0-2.265-1.012-2.265-2.263z"/></svg>',
  kick: '<svg viewBox="0 0 24 24"><path d="M1.714 0h6.857v6.857h3.429V3.43h3.428V0h6.857v9.429h-3.428v3.428h3.428V24h-6.857v-3.429h-3.428v-3.428H8.57V24H1.714z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
};

const BADGE_ICONS = {
  verified: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72 3.1 5.53l.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/></svg>',
  gem: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5.5 9h11L12 2zm0 20l5.5-9h-11L12 22zm-10-8l4-5h12l4 5-10 3-10-3z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  crown: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>',
  sprout: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s5-4.5 5-11V7s-3 1-5 4c-2-3-5-4-5-4v4c0 6.5 5 11 5 11z"/></svg>',
  staff: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></svg>',
  helper: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>',
  donor: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
  gifter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 0 0-5.5-1.65l-.5.67-.5-.68A2.99 2.99 0 0 0 9 2C7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>',
  booster: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>',
  bug: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2h10v2h4v4c0 2.21-1.79 4-4 4h-.42c-.59 3.32-2.7 5.58-5.58 5.93V19h4v2H8v-2h4v-1.07c-2.88-.35-4.99-2.61-5.58-5.93H6c-2.21 0-4-1.79-4-4V4h5zM5 6v2c0 1.1.9 2 2 2V6H5zm14 2V6h-2v4c1.1 0 2-.9 2-2z"/></svg>',
  medal: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3v7.34L3 12l4 1.66V21l5-2.5L17 21v-7.34L21 12l-4-1.66V3h-2v5.29L12 7 9 8.29V3H7z"/></svg>',
  snowflake: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L15.83 13H22v-2z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 22.19 11.5 18.36c3.07-1.39 5.54-3.77 6.6-5.76l3.91.34c-.81 3.94-3.93 7.18-8.88 9.25zM5.64 12.5c1.99-1.06 4.37-3.53 5.76-6.6L7.81 4.27C3.74 6.34.52 9.46.18 13.4l3.92.34L5.64 12.5zm15.97-10.11s-6.77-.64-11.66 4.24c-2.03 2.03-3.41 5.64-3.68 6.14-.64 1.68.62 3.3 2.3 3.3 1.08 0 3.56-.85 4.59-1.66 5.87-4.54 9.32-11.13 9.75-12.32z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.03 8.03 0 0 1 5.08 16zm2.95-8H5.08a8.03 8.03 0 0 1 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
  bunny: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-1.1 0-2 .9-2 2v5.5c-.59-.33-1.27-.5-2-.5-2.21 0-4 1.79-4 4 0 1.48.81 2.77 2 3.46V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.54c1.19-.69 2-1.98 2-3.46 0-2.21-1.79-4-4-4-.73 0-1.41.17-2 .5V4c0-1.1-.9-2-2-2zm-2 14c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm6 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 1 1 6.2 0v2z"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
  crosshair: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
  headphones: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>',
  cake: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12c.01-1.66-1.33-3-2.99-3z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
  dice: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/></svg>',
  infinity: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>',
  anchor: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 15l1.55 1.55c-.96 1.69-3.33 3.04-5.55 3.37V11h3V9h-3V7.82C14.16 7.4 15 6.3 15 5c0-1.65-1.35-3-3-3S9 3.35 9 5c0 1.3.84 2.4 2 2.82V9H8v2h3v8.92c-2.22-.33-4.59-1.68-5.55-3.37L7 15l-4-3v3c0 3.88 4.92 7 9 7s9-3.12 9-7v-3l-4 3zM12 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg>',
  paw: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm4-4A2.5 2.5 0 1 0 8.5 3a2.5 2.5 0 0 0 0 5zm7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm4 4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-2.83 4.42c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.1-.78-.1s-.53.06-.78.1c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.62-4.79z"/></svg>',
  wand: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',
  alien: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.5 5 9.6 9 11 4-1.4 9-5.5 9-11 0-4.97-4.03-9-9-9zM8.5 13.5C7 13.5 5.5 12 5.5 10.5c1.5 0 3 1.5 3 3zm7 0c0-1.5 1.5-3 3-3 0 1.5-1.5 3-3 3z"/></svg>',
  ghost: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a8 8 0 0 0-8 8v11l3-2 2.5 2 2.5-2 2.5 2 2.5-2 3 2V10a8 8 0 0 0-8-8zm-3 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
  skull: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9 9 0 0 0-9 9c0 3.6 2.1 6.6 5 8.1V21a1 1 0 0 0 1 1h1v-2h2v2h2v-2h2v2h1a1 1 0 0 0 1-1v-1.9c2.9-1.5 5-4.5 5-8.1a9 9 0 0 0-9-9zM8.5 13.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
  tree: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21l-4-6z"/></svg>',
  egg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.2 2 5 8.1 5 13a7 7 0 0 0 14 0c0-4.9-3.2-11-7-11z"/></svg>',
  like: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>',
  million: '<svg viewBox="0 0 24 24" fill="currentColor"><text x="12" y="16.5" text-anchor="middle" font-size="11" font-weight="800" font-family="Arial, sans-serif" fill="currentColor">1M</text></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>',
};

/*
  Named badge presets (guns.lol style). A profile can just say "premium" or
  { "icon": "premium" } and gets the right icon + label + brand color.
  Object form can override any field; style.badgeColor forces monochrome.
*/
const BADGE_PRESETS = {
  owner:        { icon: 'crown',     label: 'Owner',          color: '#f5c518', description: 'Founder of 762.lol' },
  staff:        { icon: 'staff',     label: 'Staff',          color: '#5e97f5', description: 'Part of the 762.lol staff team' },
  helper:       { icon: 'helper',    label: 'Helper',         color: '#4fd1c5', description: 'Helps users in the community' },
  premium:      { icon: 'gem',       label: 'Premium',        color: '#a78bfa', description: 'Supports 762.lol with Premium' },
  verified:     { icon: 'verified',  label: 'Verified',       color: '#5eb3f5', description: 'Verified identity or creator' },
  og:           { icon: 'medal',     label: 'OG',             color: '#f5a623', description: 'Here since the early days' },
  donor:        { icon: 'donor',     label: 'Donor',          color: '#4ade80', description: 'Donated to 762.lol' },
  gifter:       { icon: 'gifter',    label: 'Gifter',         color: '#f472b6', description: 'Gifted something to another user' },
  booster:      { icon: 'booster',   label: 'Server Booster', color: '#ff73fa', description: 'Boosts the 762.lol Discord' },
  bughunter:    { icon: 'bug',       label: 'Bug Hunter',     color: '#f87171', description: 'Reported a bug to the 762.lol team' },
  imagehost:    { icon: 'image',     label: 'Image Host',     color: '#60a5fa', description: 'Uses the 762.lol image host' },
  domainlegend: { icon: 'globe',     label: 'Domain Legend',  color: '#38bdf8', description: 'Donated a public domain' },
  winner:       { icon: 'trophy',    label: 'Winner',         color: '#f5c518', description: 'Won a 762.lol event' },
  second:       { icon: 'medal',     label: 'Second Place',   color: '#c0c4cc', description: 'Second place in a 762.lol event' },
  third:        { icon: 'medal',     label: 'Third Place',    color: '#cd8f52', description: 'Third place in a 762.lol event' },
  million:      { icon: 'million',   label: 'The Million',    color: '#f5c518', description: 'Celebrating 1,000,000 profile views' },
  early:        { icon: 'sprout',    label: 'Early Adopter',  color: '#4ade80', description: 'One of the first users' },
  christmas:    { icon: 'tree',      label: 'Christmas',      color: '#34d399', description: 'Winter event badge' },
  winter:       { icon: 'snowflake', label: 'Winter',         color: '#7dd3fc', description: 'Winter event badge' },
  easter:       { icon: 'egg',       label: 'Easter',         color: '#fbcfe8', description: 'Easter event badge' },
  halloween:    { icon: 'ghost',     label: 'Halloween',      color: '#fb923c', description: 'Halloween event badge' },
  birthday:     { icon: 'cake',      label: 'Birthday',       color: '#f9a8d4', description: 'Joined during launch week' },
  developer:    { icon: 'code',      label: 'Developer',      color: '#818cf8', description: 'Built something for 762.lol' },
  artist:       { icon: 'wand',      label: 'Artist',         color: '#c084fc', description: 'Creative wizard' },
  gamer:        { icon: 'gamepad',   label: 'Gamer',          color: '#8b9dff', description: 'Certified gamer' },
  musician:     { icon: 'headphones',label: 'Musician',       color: '#f472b6', description: 'Music is life' },
  lucky:        { icon: 'dice',      label: 'Lucky',          color: '#4ade80', description: 'Won a giveaway' },
  partner:      { icon: 'infinity',  label: 'Partner',        color: '#38bdf8', description: 'Official 762.lol partner' },
  marksman:     { icon: 'crosshair', label: 'Marksman',       color: '#f87171', description: '7.62 certified' },
};

const VIEW_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>';
const LOCATION_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

function resolveUsername() {
  const params = new URLSearchParams(location.search);
  const queryUser = params.get('user');
  if (queryUser) return queryUser.trim();
  const path = location.pathname.replace(/^\/+|\/+$/g, '');
  if (!path || path === 'profile.html' || path === 'index.html') return null;
  return decodeURIComponent(path.split('/').pop() || '').trim();
}

async function loadProfile(username) {
  const safe = username.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (!safe) throw new Error('invalid username');
  const res = await fetch(`/users/${safe}.json`);
  if (!res.ok) throw new Error('not found');
  return res.json();
}

function applyStyle(style = {}) {
  const root = document.documentElement;
  const map = {
    accentColor: '--accent',
    textColor: '--text',
    mutedColor: '--muted',
    cardBackground: '--card-bg',
    cardBorder: '--card-border',
    cardRadius: '--card-radius',
    cardPadding: '--card-padding',
    cardMaxWidth: '--card-max-width',
    cardGap: '--card-gap',
    avatarSize: '--avatar-size',
    avatarRadius: '--avatar-radius',
    nameSize: '--name-size',
    backgroundOverlay: '--bg-overlay',
    blur: '--blur',
    fontFamily: '--font',
  };
  for (const [k, v] of Object.entries(map)) {
    if (style[k] != null) root.style.setProperty(v, style[k]);
  }
  if (style.grayscale) root.style.setProperty('--grayscale', '1');
  if (style.preserveCase) root.style.setProperty('--text-transform', 'none');
  if (Array.isArray(style.nameGradient) && style.nameGradient.length) {
    root.style.setProperty('--name-grad-1', style.nameGradient[0]);
    root.style.setProperty('--name-grad-2', style.nameGradient[1] || style.nameGradient[0]);
  }
  if (Array.isArray(style.avatarRingColors) && style.avatarRingColors.length) {
    root.style.setProperty('--ring-1', style.avatarRingColors[0]);
    root.style.setProperty('--ring-2', style.avatarRingColors[1] || 'transparent');
  }
  if (style.cursor) {
    // image url -> custom cursor; anything else is treated as a CSS keyword
    const isUrl = /[./]/.test(style.cursor);
    document.body.style.cursor = isUrl ? `url(${style.cursor}) 4 4, auto` : style.cursor;
  }
  if (style.fontUrl) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = style.fontUrl;
    document.head.appendChild(link);
  }

  const card = document.getElementById('card');
  const nameRow = document.getElementById('name-row');
  if (style.cardless) card.classList.add('cardless');
  if (style.headerLayout === 'horizontal') card.classList.add('horizontal');
  if (style.noAvatarBorder) card.classList.add('no-avatar-border');
  if (style.badgeLayout === 'stacked') nameRow.classList.add('stacked');
  if (style.cardGlow && !style.cardless) card.classList.add('card-glow');
  if (style.cardBorderEffect === 'gradient' && !style.cardless) card.classList.add('card-gradient-border');
}

function renderBackground(bg) {
  if (!bg || !bg.src) return;
  const container = document.getElementById('bg-container');
  const overlay = container.querySelector('.bg-overlay');
  if (bg.type === 'video') {
    const v = document.createElement('video');
    v.className = 'bg-media';
    v.src = bg.src;
    v.autoplay = true;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    container.insertBefore(v, overlay);
  } else {
    const img = document.createElement('img');
    img.className = 'bg-media';
    img.src = bg.src;
    img.alt = '';
    container.insertBefore(img, overlay);
  }
}

function renderCard(data) {
  const style = data.style || {};
  const avatarEl = document.getElementById('avatar');
  if (data.avatar === null || data.avatar === '') {
    avatarEl.remove();
  } else {
    avatarEl.src = data.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png';
    avatarEl.alt = `${data.displayName || data.username} avatar`;
    if (style.avatarEffect === 'ring') {
      const wrap = document.createElement('div');
      wrap.className = 'avatar-ring-wrap';
      avatarEl.parentNode.insertBefore(wrap, avatarEl);
      wrap.appendChild(avatarEl);
    } else if (style.avatarEffect === 'glow') {
      avatarEl.classList.add('avatar-glow');
    } else if (style.avatarEffect === 'pulse') {
      avatarEl.classList.add('avatar-pulse');
    }
  }

  const nameEl = document.getElementById('display-name');
  nameEl.textContent = data.displayName || data.username || '';
  const nameFxClass = {
    glow: 'name-glow',
    rainbow: 'name-rainbow',
    gradient: 'name-gradient',
    shine: 'name-shine',
  }[style.nameEffect];
  if (nameFxClass) nameEl.classList.add(nameFxClass);
  if (data.uid != null) {
    nameEl.classList.add('tooltip-host');
    nameEl.setAttribute('data-tooltip', `UID ${formatUid(data.uid)}`);
    nameEl.setAttribute('tabindex', '0');
  }

  renderBadges(document.getElementById('badges'), data.badges || [], style);

  const titleEl = document.getElementById('title');
  if (data.title) titleEl.textContent = data.title;
  else titleEl.remove();

  const joinedEl = document.getElementById('joined');
  if (data.joinedDate) joinedEl.textContent = formatJoinedDate(data.joinedDate);
  else joinedEl.remove();

  const bioEl = document.getElementById('bio');
  if (Array.isArray(data.bio) && data.bio.length) {
    deferredTypewriter = () => startTypewriter(bioEl, data.bio, data.style || {});
  } else if (data.bio) {
    bioEl.textContent = data.bio;
  } else {
    bioEl.remove();
  }

  renderWidgets(data.widgets || [], !!data.discord?.userId);
  renderLinks(data.links || []);
  renderSocials(data.socials || []);
  renderMeta(data);
}

function extractInner(svgStr) {
  const m = svgStr.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return m ? m[1] : svgStr;
}

/*
  Badge entries can be:
    "premium"                              -> preset (icon + label + color)
    { "icon": "gem", "label": "...", "description": "...", "color": "#a78bfa" }
    { "image": "https://.../badge.png", "label": "Custom" }   custom image badge
  style.badgeColor forces every badge into one color (monochrome mode);
  style.badgeSize overrides the icon size in px.
*/
function renderBadges(container, badges, style = {}) {
  if (!container) return;
  const size = style.badgeSize != null ? Number(style.badgeSize) : 18;
  badges.forEach((b) => {
    const isObject = typeof b === 'object' && b !== null;
    const rawKey = ((isObject ? b.icon : b) || 'star').toLowerCase();
    const preset = BADGE_PRESETS[rawKey] || {};
    const iconKey = preset.icon || rawKey;
    const label = (isObject && b.label) || preset.label || capitalize(rawKey);
    const description = (isObject && b.description) || preset.description || null;
    const color = style.badgeColor || (isObject && b.color) || preset.color || null;
    const image = isObject ? b.image : null;

    const span = document.createElement('span');
    span.className = 'badge tooltip-host';
    span.setAttribute('data-tooltip', description ? `${label} — ${description}` : label);
    span.setAttribute('tabindex', '0');
    if (image) {
      span.innerHTML = `<img class="badge-img" src="${image}" alt="" width="${size}" height="${size}">`;
    } else {
      span.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">${extractInner(BADGE_ICONS[iconKey] || BADGE_ICONS.star)}</svg>`;
    }
    if (color) span.style.color = color;
    container.appendChild(span);
  });
}

function renderWidgets(widgets, keepForDiscord = false) {
  const el = document.getElementById('widgets');
  if (!widgets.length && !keepForDiscord) { el.remove(); return; }
  widgets.forEach((w) => {
    const div = document.createElement('div');
    div.className = 'widget';

    const icon = document.createElement('img');
    icon.className = 'widget-icon';
    icon.src = w.icon || '';
    icon.alt = '';
    if (w.icon) div.appendChild(icon);

    const info = document.createElement('div');
    info.className = 'widget-info';
    const name = document.createElement('div');
    name.className = 'widget-name';
    name.textContent = w.name || '';
    info.appendChild(name);

    if (w.stats?.length) {
      const stats = document.createElement('div');
      stats.className = 'widget-stats';
      w.stats.forEach((s) => {
        const span = document.createElement('span');
        span.textContent = s;
        stats.appendChild(span);
      });
      info.appendChild(stats);
    }

    if (w.url) {
      const btn = document.createElement('a');
      btn.className = 'widget-btn';
      btn.href = w.url;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.textContent = w.buttonText || 'view profile';
      info.appendChild(btn);
    }

    div.appendChild(info);

    if (w.service || w.type) {
      const label = document.createElement('div');
      label.className = 'widget-service';
      const key = (w.service || w.type || '').toLowerCase();
      if (SOCIAL_ICONS[key]) {
        const svg = document.createElement('span');
        svg.innerHTML = SOCIAL_ICONS[key];
        svg.firstChild.setAttribute('width', '11');
        svg.firstChild.setAttribute('height', '11');
        svg.firstChild.setAttribute('fill', 'currentColor');
        label.appendChild(svg);
      }
      label.appendChild(document.createTextNode(w.service || w.type));
      div.appendChild(label);
    }

    el.appendChild(div);
  });
}

function renderSocials(socials) {
  const el = document.getElementById('socials');
  if (!socials.length) { el.remove(); return; }
  socials.forEach((s) => {
    const a = document.createElement('a');
    a.className = 'social';
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = s.label || s.type || '';
    const type = (s.type || '').toLowerCase();
    a.innerHTML = SOCIAL_ICONS[type] || SOCIAL_ICONS.link;
    el.appendChild(a);
  });
}

function renderMeta(data) {
  const el = document.getElementById('meta');
  const items = [];
  if (data.views != null) {
    items.push(`<div class="meta-item">${VIEW_ICON}${formatNumber(data.views)}</div>`);
  }
  if (data.location) {
    items.push(`<div class="meta-item">${LOCATION_ICON}${data.location}</div>`);
  }
  if (!items.length) { el.remove(); return; }
  el.innerHTML = items.join('');
}

function formatNumber(n) {
  if (typeof n !== 'number') return String(n);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function formatUid(uid) {
  if (typeof uid === 'number') return uid.toLocaleString('en-US');
  return String(uid);
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatJoinedDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const diffMs = Date.now() - d.getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return 'joined today';
  if (days < 7) return `joined ${days} day${days > 1 ? 's' : ''} ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return `joined ${w} week${w > 1 ? 's' : ''} ago`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) return `joined ${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `joined ${years} year${years > 1 ? 's' : ''} ago`;
}

/* ---------- Scroll layout (alo.ne style full-page sections) ---------- */
/*
  Activated with "layout": "scroll" in the profile JSON. Renders full-viewport
  scroll-snap sections instead of the card. Section types:
    { "type": "intro" }                        avatar + name + badges (+ title)
    { "type": "text", "text": "...", "title": "..." }   centered message
    { "type": "media", "items": [{ "src": "...", "type": "video"? }, ...] }
                                               1-2 staggered media panels (gifs!)
    { "type": "socials" }                      social icon row
*/
function renderScrollLayout(data) {
  const style = data.style || {};
  const wrap = document.getElementById('profile');
  wrap.classList.add('scroll-mode');
  document.getElementById('card').remove();

  const container = document.createElement('div');
  container.className = 'scroll-container';
  container.id = 'scroll-container';

  const sections = (data.sections || []).filter((s) => s && s.type);
  if (!sections.length) sections.push({ type: 'intro' });

  sections.forEach((s) => {
    const sec = document.createElement('section');
    sec.className = `scroll-section scroll-${s.type}`;

    if (s.type === 'intro') {
      const inner = document.createElement('div');
      inner.className = 'scroll-intro-inner';

      if (data.avatar !== null && data.avatar !== '') {
        const img = document.createElement('img');
        img.className = 'scroll-avatar';
        img.src = data.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png';
        img.alt = `${data.displayName || data.username} avatar`;
        inner.appendChild(img);
      }

      const nameCol = document.createElement('div');
      nameCol.className = 'scroll-name-col';
      const nameRow = document.createElement('div');
      nameRow.className = 'scroll-name-row';
      const name = document.createElement('span');
      name.className = 'scroll-name';
      name.textContent = data.displayName || data.username || '';
      const nameFxClass = {
        glow: 'name-glow', rainbow: 'name-rainbow',
        gradient: 'name-gradient', shine: 'name-shine',
      }[style.nameEffect];
      if (nameFxClass) name.classList.add(nameFxClass);
      nameRow.appendChild(name);
      const badges = document.createElement('span');
      badges.className = 'badges scroll-badges';
      renderBadges(badges, data.badges || [], style);
      nameRow.appendChild(badges);
      nameCol.appendChild(nameRow);
      if (data.title) {
        const t = document.createElement('div');
        t.className = 'scroll-title';
        t.textContent = data.title;
        nameCol.appendChild(t);
      }
      inner.appendChild(nameCol);
      sec.appendChild(inner);
    } else if (s.type === 'text') {
      const box = document.createElement('div');
      box.className = 'scroll-text-inner';
      if (s.title) {
        const h = document.createElement('div');
        h.className = 'scroll-text-title';
        h.textContent = s.title;
        box.appendChild(h);
      }
      const p = document.createElement('p');
      p.className = 'scroll-text';
      p.textContent = s.text || '';
      box.appendChild(p);
      sec.appendChild(box);
    } else if (s.type === 'media') {
      const grid = document.createElement('div');
      grid.className = 'scroll-media-grid';
      (s.items || []).slice(0, 2).forEach((item, i) => {
        const panel = document.createElement('div');
        panel.className = `scroll-media-panel panel-${i === 0 ? 'a' : 'b'}`;
        const src = typeof item === 'string' ? item : item.src;
        const isVideo = (typeof item === 'object' && item.type === 'video') || /\.(mp4|webm)(\?|$)/i.test(src || '');
        if (isVideo) {
          const v = document.createElement('video');
          v.src = src; v.autoplay = true; v.muted = true; v.loop = true; v.playsInline = true;
          panel.appendChild(v);
        } else {
          const img = document.createElement('img');
          img.src = src; img.alt = '';
          panel.appendChild(img);
        }
        grid.appendChild(panel);
      });
      sec.appendChild(grid);
    } else if (s.type === 'socials') {
      const row = document.createElement('div');
      row.className = 'socials scroll-socials';
      (data.socials || []).forEach((so) => {
        const a = document.createElement('a');
        a.className = 'social';
        a.href = so.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = so.label || so.type || '';
        a.innerHTML = SOCIAL_ICONS[(so.type || '').toLowerCase()] || SOCIAL_ICONS.link;
        row.appendChild(a);
      });
      sec.appendChild(row);
    }

    container.appendChild(sec);
  });

  wrap.appendChild(container);

  // dot nav (right side)
  const dots = document.createElement('div');
  dots.className = 'scroll-dots';
  const secEls = [...container.querySelectorAll('.scroll-section')];
  secEls.forEach((sec, i) => {
    const dot = document.createElement('button');
    dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `section ${i + 1}`);
    dot.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth' }));
    dots.appendChild(dot);
  });
  if (secEls.length > 1) wrap.appendChild(dots);

  // "scroll for more" hint
  let hint = null;
  if (secEls.length > 1) {
    hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.innerHTML = '<span>scroll for more</span><span class="scroll-hint-arrow">&darr;</span>';
    wrap.appendChild(hint);
  }

  // views + location pinned bottom-left (alo.ne style)
  const metaItems = [];
  if (data.views != null) metaItems.push(`<span class="meta-item">${VIEW_ICON}${formatNumber(data.views)}</span>`);
  if (data.location) metaItems.push(`<span class="meta-item">${LOCATION_ICON}${data.location}</span>`);
  if (metaItems.length) {
    const meta = document.createElement('div');
    meta.className = 'scroll-meta';
    meta.innerHTML = metaItems.join('');
    wrap.appendChild(meta);
  }

  // reveal animations + active dot tracking (scroll-driven — works even when
  // rendering is throttled, unlike IntersectionObserver)
  const dotEls = [...dots.querySelectorAll('.scroll-dot')];
  const activate = () => {
    const idx = Math.min(
      secEls.length - 1,
      Math.round(container.scrollTop / Math.max(1, container.clientHeight))
    );
    secEls[idx]?.classList.add('in-view');
    dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    if (hint) hint.classList.toggle('hidden', idx !== 0);
  };
  container.addEventListener('scroll', activate, { passive: true });
  activate();

  // keyboard nav (body is overflow:hidden so the container never gets
  // native keyboard scrolling)
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('splash')) return; // let the splash consume the first key
    const idx = Math.round(container.scrollTop / Math.max(1, container.clientHeight));
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      secEls[Math.min(idx + 1, secEls.length - 1)]?.scrollIntoView({ behavior: 'smooth' });
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      secEls[Math.max(idx - 1, 0)]?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ---------- Link buttons ---------- */
function renderLinks(links) {
  const el = document.getElementById('links');
  if (!links.length) { el.remove(); return; }
  links.forEach((l) => {
    if (!l || !l.url) return;
    const a = document.createElement('a');
    a.className = 'link-btn';
    a.href = l.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    if (l.color) a.style.setProperty('--link-color', l.color);

    const iconVal = (l.icon || l.type || '').toLowerCase();
    if (l.icon && /[./]/.test(l.icon)) {
      const img = document.createElement('img');
      img.className = 'link-icon';
      img.src = l.icon;
      img.alt = '';
      a.appendChild(img);
    } else {
      const span = document.createElement('span');
      span.style.lineHeight = '0';
      span.innerHTML = SOCIAL_ICONS[iconVal] || SOCIAL_ICONS.link;
      a.appendChild(span);
    }

    const label = document.createElement('span');
    label.className = 'link-label';
    label.textContent = l.label || l.url.replace(/^https?:\/\//, '');
    a.appendChild(label);
    el.appendChild(a);
  });
}

/* ---------- Discord presence (Lanyard — free public API, no backend) ---------- */
function setupDiscord(discord) {
  if (!discord?.userId) return;
  const widgetsEl = document.getElementById('widgets');
  if (!widgetsEl) return;

  const card = document.createElement('div');
  card.className = 'discord-card';
  card.hidden = true;
  card.innerHTML = `
    <div class="discord-avatar-wrap">
      <img class="discord-avatar" alt="">
      <span class="discord-status-dot"></span>
    </div>
    <div class="discord-info">
      <div class="discord-name"></div>
      <div class="discord-activity"></div>
    </div>
    <div class="discord-label">${SOCIAL_ICONS.discord}discord</div>`;
  widgetsEl.prepend(card);

  const update = async () => {
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${discord.userId}`);
      if (!res.ok) return;
      const json = await res.json();
      if (!json.success) return;
      const d = json.data;
      const u = d.discord_user;
      card.querySelector('.discord-avatar').src = u.avatar
        ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
      card.querySelector('.discord-name').textContent = u.global_name || u.username;
      const dot = card.querySelector('.discord-status-dot');
      dot.className = `discord-status-dot ${d.discord_status || 'offline'}`;

      let activity = '';
      if (d.listening_to_spotify && d.spotify) {
        activity = `listening to ${d.spotify.song} — ${d.spotify.artist}`;
      } else {
        const custom = (d.activities || []).find((a) => a.type === 4 && a.state);
        const playing = (d.activities || []).find((a) => a.type === 0);
        if (custom) activity = custom.state;
        else if (playing) activity = `playing ${playing.name}`;
        else activity = { online: 'online', idle: 'idle', dnd: 'do not disturb' }[d.discord_status] || 'offline';
      }
      card.querySelector('.discord-activity').textContent = activity;
      card.hidden = false;
    } catch { /* lanyard unreachable or user not tracked — leave card hidden */ }
  };

  update();
  setInterval(update, 60000);
}

/* ---------- Background / cursor effects (canvas) ---------- */
function setupEffects(effects = {}) {
  const canvas = document.getElementById('fx-canvas');
  const type = (effects.background || '').toLowerCase();
  const trail = !!effects.cursorTrail;
  const known = ['snow', 'rain', 'stars', 'embers', 'particles'];
  const hasBg = known.includes(type);

  if ((!hasBg && !trail) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.remove();
    return;
  }

  canvas.classList.add('active');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  const resize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const color = effects.color || '#ffffff';
  const defaults = { snow: 70, rain: 110, stars: 90, embers: 45, particles: 40 };
  const count = effects.count != null ? Number(effects.count) : defaults[type] || 50;
  const rand = (a, b) => a + Math.random() * (b - a);

  const parts = [];
  const spawn = (fresh = false) => {
    switch (type) {
      case 'snow': return {
        x: rand(0, W), y: fresh ? -10 : rand(0, H),
        r: rand(1, 3.2), vy: rand(0.4, 1.4), sway: rand(0.3, 1.2),
        phase: rand(0, Math.PI * 2), o: rand(0.35, 0.9),
      };
      case 'rain': return {
        x: rand(0, W), y: fresh ? rand(-40, -10) : rand(0, H),
        len: rand(10, 22), vy: rand(9, 16), o: rand(0.15, 0.45),
      };
      case 'stars': return {
        x: rand(0, W), y: rand(0, H), r: rand(0.4, 1.6),
        phase: rand(0, Math.PI * 2), speed: rand(0.008, 0.03), o: rand(0.3, 1),
      };
      case 'embers': return {
        x: rand(0, W), y: fresh ? H + 10 : rand(0, H),
        r: rand(1, 2.6), vy: rand(-1.6, -0.5), vx: rand(-0.3, 0.3),
        life: 1, decay: rand(0.002, 0.006), o: rand(0.4, 0.9),
      };
      default: return { // particles
        x: rand(0, W), y: rand(0, H), r: rand(1, 2.4),
        vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25), o: rand(0.2, 0.6),
      };
    }
  };
  if (hasBg) for (let i = 0; i < count; i++) parts.push(spawn(false));

  // cursor sparkle trail
  const sparks = [];
  if (trail) {
    const trailColor = effects.cursorTrailColor || color;
    window.addEventListener('mousemove', (e) => {
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x: e.clientX + rand(-3, 3), y: e.clientY + rand(-3, 3),
          r: rand(0.6, 2), vx: rand(-0.6, 0.6), vy: rand(-0.2, 0.9),
          life: 1, decay: rand(0.02, 0.05), color: trailColor,
        });
      }
      if (sparks.length > 160) sparks.splice(0, sparks.length - 160);
    });
  }

  let t = 0;
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });

  const frame = () => {
    if (!running) return;
    t += 0.016;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      switch (type) {
        case 'snow':
          p.y += p.vy;
          p.x += Math.sin(t * p.sway + p.phase) * 0.4;
          if (p.y > H + 10) parts[i] = spawn(true);
          ctx.globalAlpha = p.o;
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          break;
        case 'rain':
          p.y += p.vy;
          if (p.y > H + 30) parts[i] = spawn(true);
          ctx.globalAlpha = p.o;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 1.5, p.y + p.len); ctx.stroke();
          break;
        case 'stars': {
          const tw = (Math.sin(t / (p.speed * 60) + p.phase) + 1) / 2;
          ctx.globalAlpha = p.o * (0.25 + tw * 0.75);
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          break;
        }
        case 'embers':
          p.y += p.vy; p.x += p.vx + Math.sin(t * 2 + p.y * 0.01) * 0.2;
          p.life -= p.decay;
          if (p.life <= 0 || p.y < -10) parts[i] = spawn(true);
          ctx.globalAlpha = Math.max(0, p.o * p.life);
          ctx.fillStyle = effects.color || '#ff8c42';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          break;
        default: // particles
          p.x += p.vx; p.y += p.vy;
          if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
          if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5;
          ctx.globalAlpha = p.o;
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life * 0.9;
      ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2); ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------- Audio ---------- */
const VOL_ICON_HIGH = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
const VOL_ICON_MID = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
const VOL_ICON_LOW = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 9v6h4l5 5V4l-5 5H7z"/></svg>';
const VOL_ICON_MUTED = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';

function pickVolumeIcon(vol, muted) {
  if (muted || vol === 0) return VOL_ICON_MUTED;
  if (vol > 0.5) return VOL_ICON_HIGH;
  if (vol > 0.15) return VOL_ICON_MID;
  return VOL_ICON_LOW;
}

function setupAudio(audio) {
  const panel = document.getElementById('audio-panel');
  const volContainer = document.getElementById('volume-container');
  const toggle = document.getElementById('volume-toggle');
  const slider = document.getElementById('volume-slider');
  const el = document.getElementById('audio-el');
  const titleEl = document.getElementById('audio-title');
  const playBtn = document.getElementById('audio-play');
  const prevBtn = document.getElementById('audio-prev');
  const nextBtn = document.getElementById('audio-next');
  const cur = document.getElementById('audio-time-current');
  const tot = document.getElementById('audio-time-total');
  const barFill = document.getElementById('audio-bar-fill');
  const bar = document.querySelector('.audio-bar');

  // Normalize audio.src / audio.tracks into a playlist array
  let tracks = [];
  if (Array.isArray(audio?.tracks) && audio.tracks.length) {
    tracks = audio.tracks;
  } else if (audio?.src) {
    tracks = [{ src: audio.src, title: audio.title }];
  }

  if (!tracks.length) {
    panel.remove();
    volContainer.remove();
    return;
  }

  let trackIdx = 0;
  const loadTrack = (idx, autoplay = true) => {
    trackIdx = (idx + tracks.length) % tracks.length;
    const t = tracks[trackIdx];
    el.src = t.src;
    titleEl.textContent = t.title || 'now playing';
    if (autoplay) el.play().catch(() => {});
  };

  const initialVol = audio.volume != null ? Math.max(0, Math.min(1, audio.volume)) : 0.7;
  el.volume = initialVol;
  let lastVol = initialVol || 0.7;
  slider.value = Math.round(initialVol * 100);
  loadTrack(0, false);
  panel.classList.add('active');
  if (tracks.length > 1) panel.classList.add('has-playlist');
  volContainer.classList.add('active');
  toggle.innerHTML = pickVolumeIcon(initialVol, false);

  prevBtn.addEventListener('click', () => loadTrack(trackIdx - 1));
  nextBtn.addEventListener('click', () => loadTrack(trackIdx + 1));
  el.addEventListener('ended', () => {
    if (tracks.length > 1) loadTrack(trackIdx + 1);
  });

  const updateIcon = () => { toggle.innerHTML = pickVolumeIcon(el.volume, el.muted); };

  el.addEventListener('loadedmetadata', () => {
    tot.textContent = fmtTime(el.duration);
  });
  el.addEventListener('timeupdate', () => {
    cur.textContent = fmtTime(el.currentTime);
    if (el.duration) barFill.style.width = (el.currentTime / el.duration) * 100 + '%';
  });
  el.addEventListener('play', () => {
    playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>';
  });
  el.addEventListener('pause', () => {
    playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  });
  el.addEventListener('volumechange', updateIcon);

  playBtn.addEventListener('click', () => {
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  });

  bar.addEventListener('click', (e) => {
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (el.duration) el.currentTime = pct * el.duration;
  });

  slider.addEventListener('input', () => {
    const v = slider.value / 100;
    el.volume = v;
    el.muted = false;
    if (v > 0) lastVol = v;
    updateSliderFill();
  });

  toggle.addEventListener('click', () => {
    if (el.muted || el.volume === 0) {
      el.muted = false;
      el.volume = lastVol || 0.5;
      slider.value = Math.round(el.volume * 100);
    } else {
      lastVol = el.volume;
      el.muted = true;
    }
    updateSliderFill();
  });

  // Fill the slider track up to the thumb using a linear-gradient
  const updateSliderFill = () => {
    const pct = el.muted ? 0 : slider.value;
    slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, rgba(255,255,255,0.2) ${pct}%, rgba(255,255,255,0.2) 100%)`;
  };
  updateSliderFill();
}

function fmtTime(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/* ---------- Typewriter ---------- */
let deferredTypewriter = null;

function startTypewriter(el, strings, style = {}) {
  const typeSpeed = style.typewriterSpeed != null ? Number(style.typewriterSpeed) : 60;
  const deleteSpeed = style.typewriterDeleteSpeed != null ? Number(style.typewriterDeleteSpeed) : 35;
  const pauseFull = style.typewriterPause != null ? Number(style.typewriterPause) : 1800;
  const pauseBetween = style.typewriterBetweenPause != null ? Number(style.typewriterBetweenPause) : 400;

  el.classList.add('typewriter');
  el.textContent = '';

  // Reserve space using the longest string so the card doesn't resize during
  // typing/deleting. The placeholder is invisible but takes up layout space;
  // the live text + cursor are positioned absolutely on top.
  const longest = strings.reduce((a, b) => (b.length > a.length ? b : a), '');
  const placeholder = document.createElement('span');
  placeholder.className = 'typewriter-placeholder';
  placeholder.textContent = longest;
  placeholder.setAttribute('aria-hidden', 'true');

  const live = document.createElement('span');
  live.className = 'typewriter-live';
  const textSpan = document.createElement('span');
  textSpan.className = 'typewriter-text';
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  live.appendChild(textSpan);
  live.appendChild(cursor);

  el.appendChild(placeholder);
  el.appendChild(live);

  let idx = 0;
  let charIdx = 0;
  let phase = 'typing';
  let timerId = null;

  const tick = () => {
    const target = strings[idx % strings.length];
    if (phase === 'typing') {
      if (charIdx < target.length) {
        charIdx++;
        textSpan.textContent = target.slice(0, charIdx);
        timerId = setTimeout(tick, typeSpeed);
      } else {
        phase = 'deleting';
        timerId = setTimeout(tick, pauseFull);
      }
    } else if (phase === 'deleting') {
      if (charIdx > 0) {
        charIdx--;
        textSpan.textContent = target.slice(0, charIdx);
        timerId = setTimeout(tick, deleteSpeed);
      } else {
        idx++;
        phase = 'typing';
        timerId = setTimeout(tick, pauseBetween);
      }
    }
  };

  timerId = setTimeout(tick, 350);
}

/* ---------- Tilt ---------- */
function setupTilt(style = {}) {
  if (style.tiltDisabled) return;
  // Skip on touch-primary devices — mousemove on touch fires unpredictably
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const card = document.getElementById('card');
  if (!card) return;

  const MAX_ANGLE = style.tiltAngle != null ? Number(style.tiltAngle) : 8;
  let rafId = null;

  const handleMove = (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 2 * MAX_ANGLE;
    const rotX = (0.5 - py) * 2 * MAX_ANGLE;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      card.style.setProperty('--tilt-x', rotX.toFixed(2) + 'deg');
      card.style.setProperty('--tilt-y', rotY.toFixed(2) + 'deg');
    });
  };

  card.addEventListener('mouseenter', () => card.classList.add('tilting'));
  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    card.classList.remove('tilting');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
}

/* ---------- Splash ---------- */
function setupSplash(data) {
  const splash = document.getElementById('splash');
  const splashText = document.getElementById('splash-text');
  const wrap = document.getElementById('profile');
  const audioEl = document.getElementById('audio-el');
  const panel = document.getElementById('audio-panel');
  const volContainer = document.getElementById('volume-container');

  const enter = () => {
    splash.classList.add('hidden');
    wrap.setAttribute('aria-hidden', 'false');
    wrap.classList.add('visible');
    if (audioEl.src) audioEl.play().catch(() => {});
    if (panel?.classList.contains('active')) requestAnimationFrame(() => panel.classList.add('visible'));
    if (volContainer?.classList.contains('active')) requestAnimationFrame(() => volContainer.classList.add('visible'));
    const videos = document.querySelectorAll('video.bg-media');
    videos.forEach((v) => v.play().catch(() => {}));
    if (deferredTypewriter) { deferredTypewriter(); deferredTypewriter = null; }
    setTimeout(() => splash.remove(), 700);
  };

  const splashEnabled = data.enterSplash?.enabled !== false;
  if (!splashEnabled) {
    splash.remove();
    wrap.classList.add('visible');
    wrap.setAttribute('aria-hidden', 'false');
    if (panel?.classList.contains('active')) panel.classList.add('visible');
    if (volContainer?.classList.contains('active')) volContainer.classList.add('visible');
    if (deferredTypewriter) { deferredTypewriter(); deferredTypewriter = null; }
    return;
  }

  splashText.textContent = data.enterSplash?.text || 'click to enter';
  splash.addEventListener('click', enter, { once: true });
  window.addEventListener('keydown', enter, { once: true });
}

function showError(msg) {
  document.getElementById('profile')?.remove();
  document.getElementById('splash')?.remove();
  document.getElementById('audio-panel')?.remove();
  document.getElementById('volume-container')?.remove();
  const err = document.getElementById('error-screen');
  err.hidden = false;
  document.getElementById('error-message').textContent = msg;
}

/* ---------- Entry ---------- */
(async function init() {
  const username = resolveUsername();
  if (!username) {
    showError('no user specified');
    return;
  }
  try {
    const data = await loadProfile(username);
    document.title = `${data.displayName || data.username || username} — 762.lol`;
    applyStyle(data.style);
    renderBackground(data.background);
    if (data.layout === 'scroll') {
      renderScrollLayout(data);
    } else {
      renderCard(data);
      setupDiscord(data.discord);
      setupTilt(data.style);
    }
    setupEffects(data.effects);
    setupAudio(data.audio);
    setupSplash(data);
  } catch (e) {
    showError(`user "${username}" not found`);
  }
})();
