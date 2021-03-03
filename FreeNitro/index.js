import * as webpackModules from "@goosemod/webpack";

var filterExternalHook;
var parseHook;
var useEmojiSelectHandlerHook;

const emojisModule = webpackModules.findByProps('getDisambiguatedEmojiContext', 'filterExternal');
const messageEmojiParserModule = webpackModules.findByProps('parse', 'parsePreprocessor', 'unparse');
const emojiPickerModule = webpackModules.findByProps('useEmojiSelectHandler');

let originalFunctions = {
	original_filterExternal: undefined,
	original_parse: undefined,
	original_useEmojiSelectHandler: undefined
};

export default {
	goosemodHandlers: {
		onImport: async () => {
			filterExternalHook = originalFunctions.original_filterExternal = emojisModule.filterExternal;
			emojisModule.filterExternal = function() { return filterExternalHook.apply(this, arguments); };
		
			parseHook = originalFunctions.original_parse = messageEmojiParserModule.parse;
			messageEmojiParserModule.parse = function() { return parseHook.apply(this, arguments); };
		
			useEmojiSelectHandlerHook = originalFunctions.original_useEmojiSelectHandler = emojiPickerModule.useEmojiSelectHandler;
			emojiPickerModule.useEmojiSelectHandler = function() { return useEmojiSelectHandlerHook.apply(this, arguments); };
		
			filterExternalHook = function(guild, query, n) {
				let emojis = emojisModule.getDisambiguatedEmojiContext(guild ? guild.guild_id : null).nameMatchesChain(query);
				if(n > 0) emojis = emojis.take(n);
				return emojis.value();
			}
		
			parseHook = function() {
				let result = originalFunctions.original_parse.apply(this, arguments);
				if(result.invalidEmojis.length !== 0) {
					for(let emoji of result.invalidEmojis) {
						result.content = result.content.replace(`<${emoji.animated ? "a" : ""}:${emoji.originalName || emoji.name}:${emoji.id}>`, `${emoji.url}&size=64&width=16`);
					}
					result.invalidEmojis = [];
				}
				return result;
			};
		
			useEmojiSelectHandlerHook = function(args) {
				const { onSelectEmoji, closePopout } = args;
				return function(data, state) {
					const emoji = data.emoji;
					if(emoji != null && emoji.available) {
						onSelectEmoji(emoji, state.isFinalSelection);
						if(state.isFinalSelection) closePopout();
					}
				};
			};
		},

		onRemove: async () => {
			filterExternalHook = originalFunctions.original_filterExternal;
			parseHook = originalFunctions.original_parse;
			useEmojiSelectHandlerHook = originalFunctions.original_useEmojiSelectHandler;
		}
	}
};
