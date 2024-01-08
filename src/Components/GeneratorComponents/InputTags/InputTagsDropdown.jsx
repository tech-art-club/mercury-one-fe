import SearchItem from '../SearchItem/SearchItem';
import SearchTag from '../SearchTag/SearchTag';

const SearchTagsDropdown = (props) => {

    return <div className={props.style}>
        {props.content?.map((el, i) =>
            <SearchTag
                key={el.id}
                content={el}
                titleFieldPath={props.titleFieldPath}
                addTag={props.addTag}
            />
        )}
    </div>
}

const SearchItemsDropdown = (props) => {

    return <div className={props.style}>
        {props.content?.map((el, i) => (
            <SearchItem
                key={i}
                content={el}
                titleFieldPath={props.titleFieldPath}
                addTag={props.addTag}
            />
        ))}
    </div>
}

const InputTagsDropdown = ({itemsDropdownStyle, inputValue, titleFieldPath, maxQuantity, tagsDropdownStyle, addTag, content = []}) => {

    return inputValue ?
        <SearchItemsDropdown
            style={itemsDropdownStyle}
            content={content
                .filter((el) => el[titleFieldPath].toLowerCase().includes(inputValue.toLowerCase()))
                .slice(0, maxQuantity)
            }
            addTag={addTag}
            titleFieldPath={titleFieldPath}
        />
        : <SearchTagsDropdown
            style={tagsDropdownStyle}
            content={content.slice(0, maxQuantity)}
            addTag={addTag}
            titleFieldPath={titleFieldPath}
        />
}

export default InputTagsDropdown;