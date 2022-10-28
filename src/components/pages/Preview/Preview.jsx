import Warn from './components/Warn';
import CurationData from './CurationData';
import {
    CommentBox,
    CurationDataWrapper,
    HashTag,
    Title,
} from './Preview.styled';

const Preview = ({ comment, hashtag, recommend }) => {
    console.log('recommmm:', recommend);
    return (
        <div
            style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 30,
            }}
        >
            <Warn recommendData={recommend} />

            <Title>내 아이 맞춤식품</Title>
            <CurationDataWrapper rows={recommend.length / 2}>
                {recommend.map((item, index) => (
                    <CurationData data={item} key={index} />
                ))}
            </CurationDataWrapper>
            <CommentBox>
                {comment}

                <p
                    style={{
                        marginTop: 30,
                        width: '80%',
                        textAlign: 'center',
                    }}
                >
                    {hashtag.map((tag, index) =>
                        tag === '' ? null : (
                            <HashTag
                                href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${tag}`}
                                target='_blank'
                                key={index}
                            >
                                {' '}
                                {tag}
                            </HashTag>
                        )
                    )}
                </p>
            </CommentBox>
        </div>
    );
};
export default Preview;
