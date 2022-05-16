import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import HunkSeparator from './HunkSeparator';

const lineNumStyle = {
    userSelect: "none",
    webkitTouchTallout: "none",
    webkitUserSelect: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    verticalAlign: "top",
};

const normalTextStyle = {
    whiteSpace: "pre-wrap",
};

const backgroundTextStyle = {
    ...normalTextStyle,
    ...lineNumStyle,
    visibility: "hidden",
};

const foregroundTextStyle = {
    ...normalTextStyle,
    position: "absolute",
    top: 0,
    left: 0,
};

export default function DiffLine(props) {

    // TODO: fix this line level highlight situation some time
    const language = Prism.highlight(props.change.content, Prism.languages.python, 'python');
    
    const isPlaceholderLine = () => {

        if (props.left){
            if (props.change.isInsert) return true
            return false
        }
        if (props.change.isDelete) return true
        return false

    }

    return (
        <tr>
            {props.left || <td style={{visibility:(isPlaceholderLine()?"hidden":"visible"), ...lineNumStyle}}>
                               <pre> {props.change.isNormal ? props.change.newLineNumber : props.change.lineNumber} </pre>
                           </td>}
            <td style={{position: "relative"}}>
                {props.change.otherContent ? 
                    [
                        <pre style={backgroundTextStyle}>{props.change.otherContent}</pre>,
                        <pre style={foregroundTextStyle} dangerouslySetInnerHTML={{ __html: language }} />
                    ] :
                    <pre style={isPlaceholderLine() ? backgroundTextStyle : normalTextStyle} dangerouslySetInnerHTML={{ __html: language }} />
                }
            </td>
            {props.left && <td style={{visibility:(isPlaceholderLine()?"hidden":"visible"), ...lineNumStyle}}>
                               <pre> {props.change.isNormal ? props.change.oldLineNumber : props.change.lineNumber} </pre>
                           </td>}
        </tr>
    )
}